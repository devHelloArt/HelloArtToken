const HelloArtToken = artifacts.require('./HelloArtToken.sol');
const fs = require("fs");

const relativePath = "../../../config/smart-contracts/HelloArtToken";
const writeFile = (fileName, content) => {
    fs.writeFile(`${__dirname}/${relativePath}/${fileName}`, content, (error) => {
        if (error) {
            console.log("writeFile error", error);
        }
    });
};

module.exports = function(deployer) {
    deployer.deploy(HelloArtToken).then(() => {
        if (HelloArtToken._json) {
            // 1. Record recently deployed contract's abi file to 'deployedABI'
            writeFile(
                "deployedABI",
                JSON.stringify(HelloArtToken._json.abi, 2),
                (error) => {
                    if (error) throw error;
                    console.log(
                        `The abi of ${HelloArtToken._json.contractName} is recorded on deployedABI file`
                    );
                }
            );
        }

        // 2. Record recently deployed contract's address to 'deployedAddress'
        writeFile("deployedAddress", HelloArtToken.address, (error) => {
            if (error) throw error;
            console.log(
                `The deployed contract address * ${HelloArtToken.address} * is recorded on deployedAddress file`
            );
        });
    });
};
};