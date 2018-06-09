// document.querySelector('.add-btn').addEventListener('click', function (e) {

//   const name = document.getElementById('name').value;
//   const kit = document.getElementById('kit').value;
//   const foot = document.getElementById('foot').value;
//   const position = document.getElementById('role').value;

//   console.log(name, kit, foot, position);

//   e.preventDefault();
// })

// Player Controller function. Add/Update/Delete Player and player info thorugh this function.
const PlayerCtrl = (function () {
  // Player Constructor
  const Player = function (id, name, kit, foot, role) {
    this.id = id;
    this.name = name;
    this.kit = kit;
    this.foot = foot;
    this.role = role;
  }

  data = {
    players: [
      /* {
        id: 0,
        name: "Tahmid Sharif",
        kit: 4,
        foot: "Left",
        role: "Defender"
      },
      {
        id: 1,
        name: "Tahmid Sultan",
        kit: 8,
        foot: "Right",
        role: "Forward"
      },
      {
        id: 2,
        name: "Zunayed Hafeez",
        kit: 7,
        foot: "Right",
        role: "Forward"
      } */
    ],
    currenPlayer: null,
    totalPlayers: 0
  }

  return {
    getPlayer: function () {
      return data.players;
    },
    addPlayer: function(name, kit, foot, role) {
      let ID;

      if(data.players.length > 0){
        ID = data.players[data.players.length - 1].id + 1;
      }else {
        ID = 0;
      }

      kit = parseInt(kit);

      newPlayer = new Player(ID, name, kit, foot, role);

      data.players.push(newPlayer);

      return newPlayer;

    },
    getTotalPlayers: function () {
      totalPlayers = data.players.length;

      return totalPlayers;
    },
    logData: function () {
      return data;
    }
  }

})();

const UICtrl = (function () {
  const UISelectors = {
    playerList: "#player-list",
    totalPlayers: '.total-players',
    name: '#name',
    kit: '#kit',
    foot: '#foot',
    role: '#role',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    editIcon: '.edit'
  }

  return {
    generatePlayerList: function (players) {
      let html = '';
      players.forEach(function (player) {
        html += `
        <li class="list-item" id="player-${player.id}">${player.name} ${player.kit} :
          <small>
            <i>${player.foot} footed</i>
          </small>
          <span>
            <i>${player.role}</i>
          </span>
          <a href="#" class="right edit">
            <i class="fa fa-pencil edit-player"></i>
          </a>
        </li>
        `;
      });

      document.querySelector(UISelectors.playerList).innerHTML = html;
    },
    addPlayerToList: function(player) {

      // Create a list item
      const li = document.createElement('li');
      li.className = "list-item";

      li.innerHTML = `
      <li class="list-item" id="player-${player.id}">${player.name} ${player.kit} :
        <small>
          <i>${player.foot} footed</i>
        </small>
        <span>
          <i>${player.role}</i>
        </span>
        <a href="#" class="right edit">
          <i class="fa fa-pencil edit-player"></i>
        </a>
      </li>
      `;

      // Insert the list item to the ul
      document.querySelector(UISelectors.playerList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function() {
      document.querySelector(UISelectors.name).value = "";
      document.querySelector(UISelectors.kit).value = "";
    },
    showTotalPlayer: function (totalPlayers) {
      document.querySelector(UISelectors.totalPlayers).innerText = totalPlayers;
    },
    getPlayerInfoInput: function() {
      return {
        name: document.querySelector(UISelectors.name).value,
        kit: document.querySelector(UISelectors.kit).value,
        foot: document.querySelector(UISelectors.foot).value,
        role: document.querySelector(UISelectors.role).value
      }
    },
    showInitialState: function() {
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    showEditState: function() {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
    },
    getUISelectors: function () {
      return UISelectors;
    }
  }

})();

const App = (function (PlayerCtrl, UICtrl) {

  const loadAllEventListeners = function  () {
    // Exposes the UI Selector vars of UICtrl
    const UISelectors = UICtrl.getUISelectors();

    // Calls the submitAddedPlayer() when add-btn is click
    document.querySelector(UISelectors.addBtn).addEventListener('click', submitAddedPlayerInfo);

    // Change the State to edit state when the pencil icon is clicked
    document.querySelector(UISelectors.playerList).addEventListener('click', playerEditClick);

    // Change the State to Initial State when Back button is clicked
    document.querySelector(UISelectors.backBtn).addEventListener('click', function (e) {
      // Call showInitialState() from the UICtrl
      UICtrl.showInitialState(); 

      e.preventDefault();
    });

  };

  const submitAddedPlayerInfo = function (e) {
    const input = UICtrl.getPlayerInfoInput();

    if(input.name !== '' && input.kit !== '' && input.foot !== '' && input.role !== '') {
      // Add the input value from the form input and list it to the players array add an id dynamically( increment every list item) of PlayerCtrl funciton.
      const newPlayer = PlayerCtrl.addPlayer(input.name, input.kit, input.foot, input.role);

      // Take the value from the newPlayer of PlayerCtrl function and insert it to the UICtrl and display it to the UI.
      UICtrl.addPlayerToList(newPlayer);

      // Get total Players
      const totalPlayers = PlayerCtrl.getTotalPlayers();

      // Out totalPlayers result in the UI
      UICtrl.showTotalPlayer(totalPlayers);

      // Clear the Input Field
      UICtrl.clearInput();

    }

    e.preventDefault();
  };

  const playerEditClick = function(e) {

    if(e.target.classList.contains("edit-player")) {
      UICtrl.showEditState();
    }

    e.preventDefault();
  }

  return {
    init: function () {
      // Show Initial State
      UICtrl.showInitialState(); 

      // Get All the player info from the data.players array in player controller
      const players = PlayerCtrl.getPlayer();

      // Loops through all the player objects and outputs and list for each
      UICtrl.generatePlayerList(players);

      // Get the total player by determining the length of the data.players object
      totalPlayers = PlayerCtrl.getTotalPlayers();

      // Out totalPlayers result in the UI
      UICtrl.showTotalPlayer(totalPlayers);

      // Load All Event Listeners
      loadAllEventListeners();
    }
  }
})(PlayerCtrl, UICtrl);

App.init();