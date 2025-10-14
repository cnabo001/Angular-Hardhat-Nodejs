pragma solidity ^0.8.17;

import './ERC20Interface.sol';

contract PharmaNetEth {
    struct User {
        uint userId;
        string user_name;
        string password;
        string user_address;
        string user_type;
        address eth_user_address;
        string state;
        string country;
    }
    
    address[] private userIndex;
    mapping(address => uint) addressToIndex;
    mapping(uint => User) public users;
    mapping(address => User) public usersAddress;
    mapping(string => User) public userNameId;

    enum UserType {
        MANUFACTER,
        DISTRIBUTOR,
        TRANSPORTER,
        RETAILER
    }
    
    UserType usertype;
    UserType defaultUserType = UserType.RETAILER;


    struct PurchaseOrder {
        uint UID;
        address receiver_address;
        address sender_address;
        uint quantity;
        uint price;
        string drug_name;
    }
    mapping(uint => PurchaseOrder) public purchaceOrders;

    struct Drug {
        uint UID;
        string drug_name;
        uint unit_price;
        address owner;
    }
    mapping (uint => Drug) public drugs;
    address[] drug_owners;

    // struct UserType{
    //     string userType = "manufactor";
    // }
    // mapping (string => UserType) public userTypes;

    struct Shipment {
        uint UID;
        address receiver_address;
        address shpper_address;
        address transport_address;
        string drugs;
        uint unit_price;
        uint quantity;
        uint total_price;
        uint transport_cost;
        bool is_received;
    }
    mapping (uint => Shipment) public shipments;

    uint public numDrugs;
    uint[] public drugsArray;
    uint public numUsers;
    uint public numOrders;
    uint public numShipments;

    address payable private token;

    event savedUser(address indexed __eth_user_address, uint index);
    event savedPO(uint indexed _uid, address indexed drug_owner);
    event savedShipment(uint indexed _uid, address indexed drug_owner);
    event savedDrug(uint indexed _uid, address indexed drug_owner);
    
    constructor(address payable _token) payable {
        numDrugs = 0;
        numUsers = 0;
        token = _token;

    }

    function hasUser(address userAddress) public view returns(bool hasIndeed) 
    {
        return (addressToIndex[userAddress] > 0 || userAddress == userIndex[0]);
    }

    function isUser(address userAddress) public returns(bool success){
        if(userIndex.length == 0) return false;
        return (userIndex[usersAddress[userAddress].userId] == userAddress);
    }
    
    function getDrugsArrray() public view returns (uint256[] memory){
        return drugsArray;
    }

    function returnMany() public pure returns(uint256, bool, uint256){
        return (1,false, 19);
    }

    function registerUser(string memory _username, string memory _password, 
    string memory _useraddress, string memory _usertype, string memory _state, string memory _country) 
    public {
        User storage user = usersAddress[msg.sender];
        user.country = _country;
        user.eth_user_address = msg.sender;
        user.password = _password;
        user.state = _state;
        user.user_address = _useraddress;
        user.user_name = _username;
        user.user_type = _usertype;
        user.userId = numUsers + 1;

        usersAddress[msg.sender] = User(
            user.userId,
            user.user_name,
            user.password,
            user.user_address,
            user.user_type,
            user.eth_user_address,
            user.state,
            user.country
        );
        emit savedUser(user.eth_user_address, user.userId);
        userIndex.push(user.eth_user_address);
        addressToIndex[msg.sender] = userIndex.length - 1;
        numUsers++;
    }
    
    function getUsers() public view returns(User[] memory){
        User[] memory usersList = new User[](numUsers);
        for(uint i = 0; i < numUsers; i++){
            User storage user = users[i];
            usersList[i] = user;
        }

        return usersList;
    }

    function getUser()
    public view returns(User memory){
        User storage u = usersAddress[msg.sender];
        return u;
    }


    function addDrug(string memory _drugName, uint _unitPrice) public {
        //TODO: require to be manufacter
        Drug storage drug = drugs[numDrugs];
        drug.owner = msg.sender;
        drug.drug_name = _drugName;
        drug.unit_price = _unitPrice;
        drug.UID = numDrugs + 1;

        drugs[numDrugs] = Drug(
            drug.UID,
            drug.drug_name,
            drug.unit_price,
            drug.owner
        );
        emit savedDrug(drug.UID, drug.owner);
        drugsArray.push(drug.UID);
        numDrugs++;

    }

    function getDrug(uint _uid) external view returns(Drug memory){
        return drugs[_uid];
    }

    function getDrugs() public view returns(Drug[] memory){
        Drug[] memory drugList = new Drug[](numDrugs);
        for(uint i = 0; i < numDrugs; i++){
            Drug storage drug = drugs[i];
            drugList[i] = drug;
        }

        return drugList;
    }

    function createPurchaseOrder(uint _uid, uint _quantity) public payable {
        uint totalPrice;
        PurchaseOrder storage purchaceOrder = purchaceOrders[numOrders];
        purchaceOrder.sender_address = msg.sender;
        Drug storage drug = drugs[_uid];
        totalPrice = drug.unit_price * _quantity;
        uint userBalance = ERC20Interface(token).balanceOf(msg.sender);
        require(userBalance <= totalPrice, "Insufficent funds");
        
        purchaceOrder.drug_name = drug.drug_name;
        purchaceOrder.price = drug.unit_price;
        purchaceOrder.quantity = _quantity;
        purchaceOrder.receiver_address = drug.owner;
        purchaceOrder.UID = numOrders +1;
        purchaceOrder.sender_address = msg.sender;

        purchaceOrders[numOrders] = PurchaseOrder(
            purchaceOrder.UID,
            purchaceOrder.receiver_address,
            purchaceOrder.sender_address,
            purchaceOrder.quantity,
            totalPrice,
            purchaceOrder.drug_name
        );
        ERC20Interface(token).transfer(drug.owner, totalPrice);
        drug.owner = msg.sender;
        emit savedPO(purchaceOrder.UID, drug.owner);
        numOrders++;

    }

    function createShipment(address _receiver_address,
        string memory _drugs,
        uint _quantity,
        uint _total_price) public payable {
        uint cost = _total_price + 1;
        bool clear = ERC20Interface(token).approve(msg.sender, cost);
        require(clear, 'Invalid transaction');
        Shipment storage shipment = shipments[numShipments];
        shipment.drugs = _drugs;
        shipment.quantity = _quantity;
        shipment.receiver_address = _receiver_address;
        shipment.shpper_address = msg.sender;
        shipment.total_price = cost;
        shipment.transport_cost = 1;
        shipment.UID = numShipments + 1;

        shipments[numShipments] = Shipment(
            shipment.UID,
            shipment.receiver_address,
            shipment.shpper_address,
            shipment.transport_address,
            shipment.drugs,
            shipment.unit_price,
            shipment.quantity,
            shipment.total_price,
            shipment.transport_cost,
            shipment.is_received
        );
        emit savedShipment(shipment.UID, shipment.shpper_address);
        numShipments++;

    }

    function startShipment(uint _uid) public payable {
        Shipment storage shipment = shipments[_uid];
        shipment.transport_address = msg.sender;
        shipment.is_received = false;
        require(ERC20Interface(token).transferFromTo(msg.sender, shipment.shpper_address, shipment.total_price), "Transaction failed");
    }

    function updateShipment(uint _uid) public returns(Shipment memory){
        Shipment storage shipment = shipments[_uid];
        require(shipment.receiver_address == msg.sender, "Unauthorized transaction");
        shipment.is_received = true;
        return shipment;
    }

}