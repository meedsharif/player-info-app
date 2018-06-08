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
  const player = function (id, name, kit, foot, position) {
    this.id = id;
    this.name = name;
    this.kit = kit;
    this.foot = foot;
    this.position = position;
  }

  data = {
    players: [{
        id: 0,
        name: "Tahmid Sharif",
        kit: 4,
        foot: "Left",
        position: "Defender"
      },
      {
        id: 0,
        name: "Tahmid Sultan",
        kit: 8,
        foot: "Right",
        position: "Forward"
      },
      {
        id: 0,
        name: "Zunayed Hafeez",
        kit: 7,
        foot: "Right",
        position: "Forward"
      }
    ],
    currenPlayer: null,
    totalPlayers: 0
  }

  return {
    getPlayer: function () {
      return data.players;
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
    totalPlayers: '.total-players'
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
            <i>${player.position}</i>
          </span>
          <a href="#" class="right edit">
            <i class="fa fa-pencil"></i>
          </a>
        </li>
        `;
      });

      document.querySelector(UISelectors.playerList).innerHTML = html;
    },
    showTotalPlayer: function (totalPlayers) {
      document.querySelector(UISelectors.totalPlayers).innerText = totalPlayers;
    }
  }

})();

const App = (function (PlayerCtrl, UICtrl) {

  return {
    init: function () {
      // Get All the player info from the data.players array in player controller
      const players = PlayerCtrl.getPlayer();

      // Loops through all the player objects and outputs and list for each
      UICtrl.generatePlayerList(players);

      // Get the total player by determining the length of the data.players object
      totalPlayers = PlayerCtrl.getTotalPlayers();

      // Out totalPlayers result in the UI
      UICtrl.showTotalPlayer(totalPlayers);
    }
  }
})(PlayerCtrl, UICtrl);

App.init();