# Lumen

## Description

Web interface for controlling your Hue devices

### Client

The client uses React and is the most important piece. Lumen was developed with the idea of being deployment as a static React site to be run completely client-side only.

### Server

The server is written in Go and serves a very specific and simple purpose. You'll only want to use it for a self-hosted and shared scenario. Meaning if you want a shared control panel (for example at home and available in your local network).
This can easily be achived by using the pre-built docker image.
