// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ConstructionDAO is KeeperCompatibleInterface {
    
     enum ProposalState { NOT_INITIATED, CREATED, CANCELLED,ACCEPTED,REJECTED,FUNDED,COMPLETED }

     event ProposalCancelled (string proposalId, string  contentId,address indexed proposalOwner,uint256 fundingGoal,uint256 dateCancelled);
     event ProposalAccepted (string proposalId, string  contentId,address indexed proposalOwner,uint256 fundingGoal,uint256 dateAccepted);
     event ProposalRejected (string proposalId, string  contentId,address indexed proposalOwner,uint256 fundingGoal,uint256 dateRejected);

     event ProposalCreated (string proposalId, string  contentId,address indexed proposalOwner,uint256 fundingGoal,uint256 dateCreated);
     event Voted (string proposalId, address proposalOwner, address  voter,bool vote);
     event ProposalFunded(string proposalId, string  contentId,address indexed proposalOwner,uint256 fundingGoal,uint256 dateFunded);

     address DAI_ADDRESS = address(0xaFf77C74E2a3861225173C2325314842338b73e6); //Polygon Mumbai DAI contract address
     IERC20 internal daiToken;
    struct Vote{
      
      bool vote;
      bool voted;
    }

    struct Proposal {
        address proposalOwner;
        string  proposalId;
        string contentId;
        uint256 fundingGoal;
        uint256 totalRaised;
        uint256 votingPeriod;
        uint256 yesVotes;
        uint256 noVotes;
        bool exist;
        mapping (address => Vote) votes;
        ProposalState currentState;
    }
     
    string[] allProposals; 
    

    IERC1155 internal cdaoToken;
    mapping (string => Proposal) proposals;
    
    constructor (address _cdaoToken)
    {
       cdaoToken = IERC1155(_cdaoToken);
       daiToken  = IERC20(DAI_ADDRESS); 
    }


   function createProposal(string calldata proposalId, string calldata contentId,uint256 votingPeriod,uint256 fundingGoal) public
   {
      require(proposals[proposalId].exist == false, "Proposal already exist");
      require(cdaoToken.balanceOf(msg.sender,1) >= 1 ,"You have no CDAO Tokens.");
      
      proposals[proposalId].proposalOwner = msg.sender;
      proposals[proposalId].proposalId = proposalId;
      proposals[proposalId].contentId =  contentId;
      proposals[proposalId].votingPeriod =  block.timestamp+ (votingPeriod * 1 seconds);
      proposals[proposalId].fundingGoal = fundingGoal;
      proposals[proposalId].currentState =  ProposalState.CREATED;                      
      proposals[proposalId].exist = true;
      allProposals.push(proposalId);
      emit ProposalCreated (proposalId,contentId,msg.sender,fundingGoal,block.timestamp);

 
   }

   function voteOnProposal(string calldata proposalId,bool vote) public
   {
       require(proposals[proposalId].exist == true, "Proposal doesn't exist");
       require(proposals[proposalId].currentState == ProposalState.CREATED,"");
       require(cdaoToken.balanceOf(msg.sender,1) >= 1 ,"You have no CDAO Tokens.");
       require(proposals[proposalId].votes[msg.sender].voted == false ,"You have already voted");         
       require(block.timestamp <=proposals[proposalId].votingPeriod ,"Voting has closed.");
       proposals[proposalId].votes[msg.sender].voted = true;
       proposals[proposalId].votes[msg.sender].vote =  vote;  

       if(vote)
         proposals[proposalId].yesVotes +=1;
       else
         proposals[proposalId].noVotes +=1;

       emit Voted (proposalId, proposals[proposalId].proposalOwner, msg.sender,vote);

   }

   function cancelProposal(string calldata proposalId) public
   {
       require(msg.sender == proposals[proposalId].proposalOwner ,"Only owner can cancel this proposal.");
       require(proposals[proposalId].currentState == ProposalState.CREATED || proposals[proposalId].currentState == ProposalState.ACCEPTED ,"You cannot cancel this proposal");
       proposals[proposalId].currentState =  ProposalState.CANCELLED;                      
       emit ProposalCancelled (proposalId, proposals[proposalId].contentId,proposals[proposalId].proposalOwner,proposals[proposalId].fundingGoal,block.timestamp);
      
   }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
 

       for(uint256 loop=0;loop < allProposals.length;loop++)
       {
           //check if proposal created && voting Period Expired
           if( proposals[allProposals[loop]].currentState == ProposalState.CREATED && block.timestamp >  proposals[allProposals[loop]].votingPeriod )     
           {
               return(true,abi.encode(loop));
           }

           //check if proposal accepted && not funded
           if( proposals[allProposals[loop]].currentState == ProposalState.ACCEPTED && daiToken.balanceOf(address(this)) >=  proposals[allProposals[loop]].fundingGoal*10**18 )     
           {
               return(true,abi.encode(loop));
           }    
       }     
       return(false,bytes(""));
    }

   function performUpkeep(bytes calldata performData) external {
      uint256 _proposalId = abi.decode(performData, (uint256));
      //check if proposal created && voting Period Expired
      if( proposals[allProposals[_proposalId]].currentState == ProposalState.CREATED && block.timestamp >  proposals[allProposals[_proposalId]].votingPeriod )     
      {
         if(proposals[allProposals[_proposalId]].yesVotes > proposals[allProposals[_proposalId]].noVotes )
         {
            proposals[allProposals[_proposalId]].currentState = ProposalState.ACCEPTED;
            emit ProposalAccepted (proposals[allProposals[_proposalId]].proposalId, proposals[allProposals[_proposalId]].contentId,proposals[allProposals[_proposalId]].proposalOwner,proposals[allProposals[_proposalId]].fundingGoal,block.timestamp);
   
         } 
         else
         {
             proposals[allProposals[_proposalId]].currentState = ProposalState.REJECTED;
             emit ProposalRejected (proposals[allProposals[_proposalId]].proposalId, proposals[allProposals[_proposalId]].contentId,proposals[allProposals[_proposalId]].proposalOwner,proposals[allProposals[_proposalId]].fundingGoal,block.timestamp);

         }              
      }

      //check if proposal accepted && not funded
      if( proposals[allProposals[_proposalId]].currentState == ProposalState.ACCEPTED && daiToken.balanceOf(address(this)) >=  proposals[allProposals[_proposalId]].fundingGoal*10**18 )     
      {
                       
           daiToken.transfer( proposals[allProposals[_proposalId]].proposalOwner,proposals[allProposals[_proposalId]].fundingGoal*10**18);
           proposals[allProposals[_proposalId]].currentState = ProposalState.FUNDED;
           emit ProposalFunded(proposals[allProposals[_proposalId]].proposalId, proposals[allProposals[_proposalId]].contentId,proposals[allProposals[_proposalId]].proposalOwner,proposals[allProposals[_proposalId]].fundingGoal,block.timestamp);

      }    
  
   }


}