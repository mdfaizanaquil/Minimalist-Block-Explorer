// --- CONFIGURATION ---
const RPC_URL = "YOUR_RPC_URL_HERE";

// --- ELEMENTS ---
const latestBlockSpan = document.getElementById('latestBlock');
const searchBtn = document.getElementById('searchBtn');
const blockSearchInput = document.getElementById('blockSearch');
const resultDiv = document.getElementById('result');

// --- APP LOGIC ---
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Function to display block details
async function displayBlock(blockNumber) {
    resultDiv.innerText = `Fetching details for block #${blockNumber}...`;
    try {
        const block = await provider.getBlock(blockNumber);
        if (!block) {
            resultDiv.innerText = `Block #${blockNumber} not found.`;
            return;
        }
        resultDiv.innerHTML = `
            <strong>Block #${block.number} Details:</strong>
            <p><strong>Hash:</strong> ${block.hash.slice(0,15)}...</p>
            <p><strong>Timestamp:</strong> ${new Date(block.timestamp * 1000).toLocaleString()}</p>
            <p><strong>Transactions:</strong> ${block.transactions.length}</p>
        `;
    } catch (error) {
        resultDiv.innerText = `Error: ${error.message}`;
    }
}

// Listen for new blocks in real-time
provider.on('block', (blockNumber) => {
    latestBlockSpan.innerText = blockNumber;
});

// Handle search button click
searchBtn.addEventListener('click', () => {
    const blockNum = parseInt(blockSearchInput.value);
    if (!isNaN(blockNum)) {
        displayBlock(blockNum);
    }
});

// Get the initial latest block
provider.getBlockNumber().then(blockNumber => {
    latestBlockSpan.innerText = blockNumber;
});
