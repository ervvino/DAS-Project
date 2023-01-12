//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Example deployed to Goerli: tobefilled

contract IssuingAuthority {
    // Event to emit when a Diploma is created. 
    event NewDiploma(
        address indexed authorityWalletId,
        uint256 timestamp,
        string documentFingerprint,
        bool validity
    );
    
    // Diploma struct.
    struct Diploma {
        address authorityWalletId;
        uint256 timestamp;
        string documentFingerprint;
        bool validity;
    }
    
    // Address of contract deployer. Marked payable so that
    // we can withdraw to this address later.
    address payable owner;

    mapping(string => Diploma) public diplomas;

    constructor() {
        // Store the address of the deployer as a payable address.
        // When we withdraw funds, we'll withdraw here.
        owner = payable(msg.sender);
    }

    /**
     * @dev fetches all stored diplomas => not needed?
    function getMemos() public view returns (diplomas memory) {
        return diplomas;
    }
    */

    /**
     * @dev create a new diploma issued by authority
     * @param _validity validity of diploma
     * @param _documentFingerprint a nice message from the purchaser
     */
    function createDiploma(bool _validity, string memory _documentFingerprint) public payable {
        require(msg.sender == owner, "Only the owner is authorised to add ne diplomas");

        diplomas[_documentFingerprint] = Diploma(
            msg.sender,
            block.timestamp,
            _documentFingerprint,
            _validity
        );

        // Emit a NewDiploma event with details about the memo.
        emit NewDiploma(
            msg.sender,
            block.timestamp,
            _documentFingerprint,
            _validity
        );
    }

    /**
     * @dev change to readDiploma, returrns diplomaObject
    }
    */
   function verifyDiploma(string memory _documentFingerprint) public view returns (Diploma memory) {
    return diplomas[_documentFingerprint];
   }

   /**
    * @todo write verifyDiploma function which just retursn true or false validity for a fingerprint
    */
}
