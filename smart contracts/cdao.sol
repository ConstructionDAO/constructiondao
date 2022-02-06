// SPDX-License-Identifier: MIT
//Represents a basic contract.
// Proof of Concept for hackathon
// Contract will be  more robust for production ready deployment
pragma solidity ^0.8.0;



import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract CDAO is ERC1155,Ownable {


    address DAI_ADDRESS = address(0xaFf77C74E2a3861225173C2325314842338b73e6); //Polygon Mumbai DAI contract address
    IERC20 internal daiToken;
    address treasury;
    
    constructor() ERC1155("https://cuwylrgeukla.usemoralis.com:2053/server/functions/api?_ApplicationId=pDrFKmhfObCt8pAEz0iEk9SPBBHria9xm6VeFsKG&id={id}") {
      treasury = address(this);
      daiToken =   IERC20(DAI_ADDRESS);

    }

    function setTreaury(address _treasury) public onlyOwner {
        treasury = _treasury;
    }

    function mint(uint256 amount) public
    {
       require(amount >= 1 ,"Amount must be greater than zero.");
       require(treasury != address(this),"Treasury not set.");
  	   require(daiToken.balanceOf(msg.sender) >= amount*10**18, "Not enough balance");
       daiToken.transferFrom(msg.sender, treasury,amount*10**18);
       _mint(msg.sender, 1, amount, "");    //Mint CDAO Tokens
	     

    }

}   