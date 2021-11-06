//pragma solidity ^0.5.4;
contract Faucet {
    function withdraw(uint withdraw_amount) public {
        require(withdraw_amount <= 100000000000000000);
        payable(msg.sender).transfer(withdraw_amount);
    }

//    fallback() external payable {
//
//    }
}



