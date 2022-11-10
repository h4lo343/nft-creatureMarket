

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
  },

  mocha: {

  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17"
    }
  }

};
