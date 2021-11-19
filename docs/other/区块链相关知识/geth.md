
# 1. Geth 使用
## 1.1. 同步区块
```
geth  --datadir . --syncmode fast --cache 1024

```

## 1.2. 连接geth终端
```
// 以下为连接goerli  签名使用clef 可以用其他钱包管理工具
geth --goerli --syncmode "light" --datadir . --http --signer=\\.\pipe\clef.ipc

geth --syncmode "light" --datadir . --http

geth --ropsten --syncmode "light" --datadir . --http


geth attach \\.\pipe\geth.ipc

端口: 127.0.0.1:8545 连接
```