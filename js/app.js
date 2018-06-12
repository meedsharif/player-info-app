// Storage Controller. Persist the data to local storage
const StorageCtrl = (function() {
  return {
    storePlayerInfo: function(player) {
      // Initialize a player variable where the player keys will be stored.
      let players;

      // Check if players key already already exists in the localStorage 
      if(localStorage.getItem("players") === null) {
        /* 
          # If not, then asign an empty array to the player variable and then push the 'player' parameter into the array. # Then set the new keys to localStorage after converting the array to a string.
        */
        players = [];
        players.push(player);

        localStorage.setItem("players", JSON.stringify(players));
      } else {
        /* 
          # If yes, then at first get the keys from localStorage then push 'player' parameter into the players[]. 
          # Then set the new keys to localStorage after converting the array to a string.
        */
        players = JSON.parse(localStorage.getItem("players"));

        players.push(player);

        localStorage.setItem("players", JSON.stringify(players));
      }
    },
    getPlayerInfoFromStorage: function() {
      // Initialize a player variable where the player keys will be stored.
      let players;

      // Check if players key already already exists in the localStorage 
      if(localStorage.getItem("players") === null) {
      // If not, then asign an empty array to the player variable and then push the 'player' parameter into the array.
        players = [];
      } else {
        // If yes, then at first get the keys from localStorage then push 'player' parameter into the players[]. Then set
        players = JSON.parse(localStorage.getItem("players"));
      }

      // Return players[]
      return players;
    },
    updatePlayerInfoInStorage: function(updatedPlayerInfo) {
      // Get the players[] keys from localStorage
      let players = JSON.parse(localStorage.getItem("players"));

      /*  
          # Loop through all the player object in the players[].
          # Check if the updatedPlayerInfo.id matches any of the id in the players[].
          # If matched, replace the data for that player with 'updatedPlayerInfo'.
      */
      players.forEach(function(player, index){
        if(updatedPlayerInfo.id === player.id) {
          players.splice(index, 1, updatedPlayerInfo);
        };
      });

      // Save the updated data in localStorage after conveting players[] it to a string.
      localStorage.setItem("players", JSON.stringify(players));
    },
    deletePlayerFromStorage: function(id) {
      // Get players[] from local
      let players = JSON.parse(localStorage.getItem("players"));

      /* 
        # Loop through all the layer object in the players[].
        # Chack if 'id' matches any of id of the player object.
        # When the id matches delete that player object from players[].
      */
      players.forEach(function(player, index){
        if(id === player.id) {
          players.splice(index, 1);
        }
      });

      // Save the updated data in localStorage after conveting players[] it to a string.
      localStorage.setItem("players", JSON.stringify(players));
    },
    clearAllPlayersFromStorage: function() {
      // Clear local stroage.
      localStorage.removeItem("players");
    }
  };
})();

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
    players: StorageCtrl.getPlayerInfoFromStorage(),
    currentPlayer: null,
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
    getPlayerById: function(id) {
      let found = null;

      data.players.forEach(function(player) {
        if(player.id === id){
          found = player;
        }
      });

      return found;
    },
    updatedPlayerInfo: function(name, kit, foot, role) {
      let found = null;

      kit = parseInt(kit);

      data.players.forEach(function(player){
        if(player.id === data.currentPlayer.id) {
          player.name = name;
          player.kit = kit;
          player.foot = foot,
          player.role = role;

          found = player;
        }

      });
      return found;
    },
    deletePlayer: function(id) {
      // Select the all players in the data.players[] and return their player id
      const ids = data.players.map(function(player){
        return player.id;
      })

      // Get the index of the data.currentplayer
      const index = ids.indexOf(id);

      // From the data.players[] remove this player object.
      data.players.splice(index, 1)
    },
    clearAllPlayer: function() {
      data.players = [];
    },
    getTotalPlayers: function () {
      totalPlayers = data.players.length;

      data.totalPlayers = totalPlayers;      

      return data.totalPlayers;
    },
    setCurrentPlayer: function(player) {
      data.currentPlayer = player;
    },
    getCurrentPlayer: function() {
      return data.currentPlayer;
    },
    logData: function () {
      return data;
    }
  }

})();

const UICtrl = (function () {
  const UISelectors = {
    playerList: "#player-list",
    playerLists: "#player-list li",
    totalPlayers: '.total-players',
    name: '#name',
    kit: '#kit',
    foot: '#foot',
    role: '#role',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
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
      li.id = `player-${player.id}`;
      // 
      li.innerHTML = `
        ${player.name} ${player.kit} :
        <small>
          <i>${player.foot} footed</i>
        </small>
        <span>
          <i>${player.role}</i>
        </span>
        <a href="#" class="right edit">
          <i class="fa fa-pencil edit-player"></i>
        </a>
        `;

      // Insert the list item to the ul
      document.querySelector(UISelectors.playerList).insertAdjacentElement('beforeend', li);
    },
    updatePlayerList: function(updatedPlayer) {
      // Select player list of the <ul>
      let playerListItem = document.querySelectorAll(UISelectors.playerLists);

      // Turn Node list into array
      playerListItem = Array.from(playerListItem);

      playerListItem.forEach(function(playerList) {
        const playerID = playerList.getAttribute("id");

        // If the ID of the currentPlayer matches any of the id from the playerList then update the html of that list.
        if (playerID === `player-${updatedPlayer.id}`) {
          document.querySelector(`#${playerID}`).innerHTML = `
          ${updatedPlayer.name} ${updatedPlayer.kit} :
          <small>
            <i>${updatedPlayer.foot} footed</i>
          </small>
          <span>
            <i>${updatedPlayer.role}</i>
          </span>
          <a href="#" class="right edit">
            <i class="fa fa-pencil edit-player"></i>
          </a>
          `;
        }
      });
    },
    deletePlayerListItem: function(id) {
      // player id of data.currentPlayer
      const playerID = `#player-${id}`;
      // Select the selected player in the UI
      const player = document.querySelector(playerID);
      // Remove the player from the UI
      player.remove();
    },
    clearPlayer: function() {
      // Select player list of the <ul>
      let playerListItem = document.querySelectorAll(UISelectors.playerLists);

      // Turn Node list into array
      playerListItem = Array.from(playerListItem);

      // Remove all the players from the list
      playerListItem.forEach(function(player){
        player.remove();
      });
    },
    // Fill the Input fields with the data taken from getCurrentPlayer().
    addPlayerToForm: function() {
      document.querySelector(UISelectors.name).value = PlayerCtrl.getCurrentPlayer().name;
      document.querySelector(UISelectors.kit).value = PlayerCtrl.getCurrentPlayer().kit;
      document.querySelector(UISelectors.foot).value = PlayerCtrl.getCurrentPlayer().foot;
      document.querySelector(UISelectors.role).value = PlayerCtrl.getCurrentPlayer().role;

      UICtrl.showEditState();
    },
    clearInput: function() {
      document.querySelector(UISelectors.name).value = "";
      document.querySelector(UISelectors.kit).value = "";
    },
    showTotalPlayer: function (totalPlayers) {
      document.querySelector(UISelectors.totalPlayers).innerText = totalPlayers;
    },
    // Get Player details from input form.
    getPlayerInfoInput: function() {
      return {
        name: document.querySelector(UISelectors.name).value,
        kit: document.querySelector(UISelectors.kit).value,
        foot: document.querySelector(UISelectors.foot).value,
        role: document.querySelector(UISelectors.role).value
      }
    },
    // Hides all the button except the Add Player button
    showInitialState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";

      // Disable submit onEnter
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
          return true;
        }
      });
    },
    // Shows All the button Except the All Player Button
    showEditState: function() {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";

      // Disable submit onEnter
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          return false;
        }
      });
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
    document.querySelector(UISelectors.playerList).addEventListener('click', playerEditState);

    // Submit the updated info when updateBtn is clicked
    document.querySelector(UISelectors.updateBtn).addEventListener('click', submitUpdatedPlayerInfo);

    // remove the selected player object from data.players[] and update the UI when delete button in clicked
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deletePlayerFromList);

    // Clear all the players from the list when Clear All is clicked
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllFromList);

    // Change the State to Initial State when Back button is clicked
    document.querySelector(UISelectors.backBtn).addEventListener('click', function (e) {
      // Call showInitialState() from the UICtrl
      UICtrl.showInitialState(); 

      // Clear input fields
      UICtrl.clearInput();

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

      StorageCtrl.storePlayerInfo(newPlayer);

      // Get total Players
      updateTotalPlayerCount();

      // Clear the Input Field
      UICtrl.clearInput();

    }

    e.preventDefault();
  };

  const playerEditState = function(e) {

    if(e.target.classList.contains("edit-player")) {
      // Get the id from the list-item
      const listID = e.target.parentNode.parentNode.id;

      // Divide the id into an array separated by "-"
      const listIdArr = listID.split('-');

      // Get the number from the id and convert it to an integer
      const id = parseInt(listIdArr[1]);
      
      // Get the player object of that id from the data.players[]
      const playerToEdit = PlayerCtrl.getPlayerById(id);
      
      // Set the selected player to the currentPlayer var
      PlayerCtrl.setCurrentPlayer(playerToEdit);

      // Fill up the input fields with that player info
      UICtrl.addPlayerToForm();
    }

    e.preventDefault();
  };

  const submitUpdatedPlayerInfo = function(e) {

    // Get input values
    const input = UICtrl.getPlayerInfoInput();

    
    if(input.name !== '' && input.kit !== '' && input.foot !== '' && input.role !== '') {

      // Replace the data of the data.currenPlayer with this updated input values
      const updatedPlayerInfo = PlayerCtrl.updatedPlayerInfo(input.name, input.kit, input.foot, input.role);

      // Insert it to the UI
      UICtrl.updatePlayerList(updatedPlayerInfo);

      // Update in the localStorage
      StorageCtrl.updatePlayerInfoInStorage(updatedPlayerInfo);

      // Go back to initial state
      UICtrl.showInitialState();
    }

    e.preventDefault();
  };

  const deletePlayerFromList = function(e) {
    // Get  selected player from data.currentPlayer of PlayerCtrl
    const currenPlayer = PlayerCtrl.getCurrentPlayer();

    // Delete currentPlayer from data.players[]
    PlayerCtrl.deletePlayer(currenPlayer.id);

    // Update the UI. Delete currentPlayer from List
    UICtrl.deletePlayerListItem(currenPlayer.id);

    // Show Initial State
    UICtrl.showInitialState();

    // Delete player in storage
    StorageCtrl.deletePlayerFromStorage(currenPlayer.id);

    // Update Total Player Count
    updateTotalPlayerCount();

    e.preventDefault()
  };

  const clearAllFromList = function (e) {
    // Clear the data.players[]
    PlayerCtrl.clearAllPlayer();

    // Update the UI
    UICtrl.clearPlayer();

    // Update Total count
    updateTotalPlayerCount();

    // Clear all players form local Storage
    StorageCtrl.clearAllPlayersFromStorage();

    e.preventDefault();
  }

  const updateTotalPlayerCount = function () {
    // Dertermine totalPlayer count by length calculating data.player[]
    const totalPlayers = PlayerCtrl.getTotalPlayers();
    // Out totalPlayers result in the UI
    UICtrl.showTotalPlayer(totalPlayers);
  };

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
