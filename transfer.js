const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon.stellar.org');

// Substitua com sua chave privada e pública geradas no VSCode
const secretKey = "SCQSNNSNVMBBIGDER7PU4U7QQJOHQ2F2KGW6LEKC4545Z75M2LDMYZP7";
const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
const sourcePublicKey = sourceKeypair.publicKey();

// Defina o destinatário e o valor da transferência
const destinationPublicKey = "CHAVE_PUBLICA_DO_DESTINATARIO";
const amount = "10";  // Valor em XLM a ser enviado

async function sendTransaction() {
  try {
    // Carrega a conta de origem
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    // Define a taxa da transação
    const fee = await server.fetchBaseFee();

    // Cria a transação
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.PUBLIC
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: amount
      }))
      .setTimeout(30)
      .build();

    // Assina a transação com a chave privada
    transaction.sign(sourceKeypair);

    // Envia a transação
    const transactionResult = await server.submitTransaction(transaction);
    console.log('✅ Transação enviada com sucesso:', transactionResult);
  } catch (error) {
    console.error('Erro ao enviar transação:', error);
  }
}

sendTransaction();
