# Voting Dapp

This project implements the frontend for the Voting smart contract that was created during Project 1. It is based on `truffle react box`.

## Deployement

The deployement script automatically add the owner of the smart contract to the whitelist.

## Modeling

The following model was created at the start of the project.
Some things might have changed during the implementation :

![Modeling Dapp](./dapp-voting-schema.png?raw=true)

## Work repartition

### Samir

- Implemented the global structure of the application
- Implemented the `Admin` and `Events` components of the project
- Implemented a global context `AppContext` to make some elements easily reusable (`events`, `status`, `owner`, `whitelist`)
-

### Quentin

- Created the first version of the model
- Updated the contract to add natspec comments and fix security issue
- Implemented the `Main` and `Search` components of the project

## Demo video

The demo video is available [here](https://www.loom.com/share/954c26b76928497ba3cb6e5520ba75b6)

## Public access

- The Smart Contract is deployed :
  - On Goerli at the following address [0x35d60F7481B514ead969AABB97c1c72edceb05Dd](https://goerli.etherscan.io/address/0x35d60F7481B514ead969AABB97c1c72edceb05Dd)
  - On Mumbai at the following address [0xcFaF3116F381d88cF1C1eDd904cd607e2c1a61D1](https://mumbai.polygonscan.com/address/0xcFaF3116F381d88cF1C1eDd904cd607e2c1a61D1)

- The DApp is available at the following address : [https://dapp-voting-delta.vercel.app/](https://dapp-voting-delta.vercel.app/)
