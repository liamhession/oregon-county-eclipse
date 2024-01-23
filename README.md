#How to test local site from phone on same network

Run `ipconfig getifaddr en0` to see your IP Address.

Replacing the address below with whatever you got, run:
`hugo server --bind 192.168.58.103 --baseURL http://192.168.58.103`

It's possible that network settings on the network you're on will prevent this working.