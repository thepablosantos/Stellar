const StellarSdk = require('stellar-sdk');

// Defina a chave pública da conta que você criou no VSCode
const publicKey = "GDGVHROBKTHLVPQ4BPTBAA2AWPG73VDNREHWKDFM545NICZGJLOFX4RC";

// Conecte-se ao servidor da Stellar Mainnet
const server = new StellarSdk.Server('https://horizon.stellar.org');

async function checkBalance() {
  try {
    const account = await server.loadAccount(publicKey);
    console.log('💰 Saldo da Conta:');
    account.balances.forEach(balance => {
      console.log(`- Asset: ${balance.asset_type}, Saldo: ${balance.balance}`);
    });
  } catch (error) {
    console.error('Erro ao verificar o saldo:', error);
  }
}

checkBalance();
