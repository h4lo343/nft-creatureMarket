

const NtfMarket = artifacts.require("NftMarket");

contract("NftMarket", (accounts) => {

    let _contract  = null;


    before( async () => {
        _contract = await NtfMarket.deployed();
    })

    describe("Mint token", () => {
        const tokenURI = "https://test.com"
        before(async () => {
            await _contract.mintToken(tokenURI, {
                from: accounts[0]
            })
        })

            it("owner of first token should be address[0]", async () => {
            const owner = await _contract.ownerOf(1)
            assert(owner == "0x82a55cc8CDCDAC97c0a33B5Cf18bC3F9230861Cd", "Owner of token is not matching address[0]")
        })

            it("First token should point to the correct tokenURI", async () => {
                const actualTokenURI = await _contract.tokenURI(1);

                assert.equal(actualTokenURI, tokenURI, "owner of token is not matching address[0]")
            })


    })



} )

