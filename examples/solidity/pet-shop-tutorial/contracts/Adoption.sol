pragma solidity ^0.5.0;

contract Adoption {

  address[16] public adopters;  // 保存领养者的地址
  event SeeAddress(address _from);
    // 领养宠物
  function adopt(uint petId) public returns (uint) {
    require(petId >= 0 && petId <= 15);  // 确保id在数组长度内

    adopters[petId] = msg.sender;        // 保存调用这地址
    emit SeeAddress(msg.sender);
    return petId;
  }





  // 返回领养者
  function getAdopters() public view returns (address[16] memory) {
//    bytes32 b = '0x111122223333444455556666777788889999AAAABBBBCCCCDDDDEEEEFFFFCCCC';
//    return adopters;

//    address ad1 = 0xF2FC45AAe8dB881Ec31b1621D9EbfecC609023F7;
//    uint160 _ownerUint = 1273516916528256943268872459582090959717186069252;
//    address ad2 = address(_ownerUint);

//    emit SeeAddress(ad1);
//    return [ad1, ad2, ad2];
    return adopters;
  }

}