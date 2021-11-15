使用docker中的solc:
docker run ethereum/solc:stable solc --version


使用docker进行编译
docker run -v D:/work/git/useful/examples/solidity/test:/sources ethereum/solc:stable -o /sources/output --abi --bin /sources/Faucet.sol


语法变更:
Change msg.sender.transfer(x) to payable(msg.sender).transfer(x) or use a stored variable of address payable type.