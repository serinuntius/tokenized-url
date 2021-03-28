//SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {
  ReentrancyGuard
} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenizedUrl is ERC721, ReentrancyGuard {
  mapping(uint256 => string) internal _tokenURIs;

  constructor() ERC721("TokenizedUrl", "URL") {
  }

  function mint(address to, uint256 tokenId, string memory uri) public nonReentrant {
    require(bytes(uri).length != 0, "ERC721Metadata: URI doesn't exist.");
    super._mint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }
}
