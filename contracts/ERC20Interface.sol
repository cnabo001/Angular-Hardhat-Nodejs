pragma solidity ^0.8.17;

interface ERC20Interface {
    function balanceOf(address _owner) external view returns (uint256 balance);
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFromTo(address _to, address _from , uint _value) external returns (bool success);
    function approve(address _sender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

