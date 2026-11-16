---
title: "Cornell Rocketry Embedded Linux"
summary: "A custom Linux image for Cornell Rocketry's fill station: our own kernel, root filesystem, and bootloaders, built reproducibly with Nix and small enough to boot from flash."
date: 2026-11-07
tags:
  - Nix
  - Embedded Linux
  - Rust
  - U-Boot
repoUrl: https://github.com/cornellrocketryteam/Software26-27
---

At our 2025 competition the fill station, the computer that loads nitrous into the rocket, started crashing at random. It was a Raspberry Pi running Raspberry Pi OS, and it had never done this in testing. It only happened at the competition, which is the worst place for it. Our best guess afterwards is overheating, but we still do not know for sure. Heat testing is now on our pre-competition checklist, since a lab in upstate New York is a poor stand-in for the Texas desert in June.

That was the problem. We were running a general-purpose operating system we had not built and could not fully explain, on the one computer that cannot be allowed to crash. Out of that, and out of my summer at [Northwood Space](https://www.northwoodspace.io) building NixOS images for embedded boards, came the idea of doing it properly: pick our own embedded Linux board, and compile our own kernel, device tree, and root filesystem for it.

## What we wanted

Three things. The image should be small enough to live on the board's flash chip instead of an SD card. It should boot fast, so a power cycle on the pad costs seconds. And it should be reproducible, so the image on the fill station is exactly the one in the repository and anyone on the team can rebuild it bit for bit.

Reproducibility is a large part of why we chose Nix. The other part is [MixOS](https://codeberg.org/jmbaur/mixos), a minimal Linux distribution that is configured with the NixOS module system. I had used it and contributed to it before, so I knew it would give us a tiny system described in a few files rather than a full distribution to strip down.

## What it is now

The fill station is a [TI SK-AM64B](https://www.ti.com/tool/SK-AM64B) board. One Nix command cross-compiles everything for it: the Linux kernel from our own config, the bootloaders and firmware, the device tree, and a root filesystem containing little more than BusyBox, an SSH server, and the fill station program, which is written in Rust. The result is a single image file holding the kernel, device tree, and root filesystem.

The build also checks its own work. It verifies the pin configuration against the real board's device tree, and it fails if any piece is too large for its flash partition, so we find out at a desk rather than on the pad. At runtime the init system restarts the fill station program if it ever exits.

## Three years of the fill station

|  | 2024–25 | [2025–26](https://github.com/cornellrocketryteam/Software25-26) | [2026–27](https://github.com/cornellrocketryteam/Software26-27) |
| --- | --- | --- | --- |
| Board | Raspberry Pi 5 | TI SK-AM64B | TI SK-AM64B |
| Operating system | Raspberry Pi OS | MixOS | MixOS |
| Fill station software | C++ in Docker | Rust | Rust |
| Kernel | Stock | Linux 6.18, own config | Linux 7.2, own config |
| Kernel size | n/a | 10.36 MiB | 4.49 MiB |
| Root filesystem | n/a | 9.65 MiB | 13.30 MiB |
| Whole image | n/a | 20.08 MiB | 17.86 MiB |
| Boots from | NVMe drive on a HAT | SD card | 64 MiB flash |

This year's work was on the kernel and on modernizing how we use Nix. We went through the kernel config and removed everything the board does not have, which cut the kernel to less than half its size even as the root filesystem grew. The whole system now fits in under a third of the flash partition set aside for it. I also restructured the Nix code around what I learned at Anduril, so the flake is organized into small modules and is much easier for a new member to find their way around.
