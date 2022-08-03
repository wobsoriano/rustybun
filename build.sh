#!/bin/sh

cargo zigbuild --target aarch64-apple-darwin --release
cargo zigbuild --target x86_64-apple-darwin --release
# cargo zigbuild --target aarch64-unknown-linux-gnu --release
cargo zigbuild --target x86_64-unknown-linux-gnu --release
