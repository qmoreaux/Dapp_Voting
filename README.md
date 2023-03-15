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

**To add**

## Public access

- The Smart Contract is deployed on Goerli at the following address [0xfd81505A66f3F55Fe3d82e997729FfA0337F5B13](https://goerli.etherscan.io/address/0xfd81505A66f3F55Fe3d82e997729FfA0337F5B13)

- The DApp is available at the following address : [https://dapp-voting-delta.vercel.app/](https://dapp-voting-delta.vercel.app/)
