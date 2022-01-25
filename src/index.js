wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'connect':
      return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: `Hello ${requestObject.params.username}`,
              description: 'You have successfully',
              textAreaContent:
              ` Your peer ID is: ${requestObject.params.peerId}
                Your wallet is: ${requestObject.params.walletId}`,
            },
          ],
      }); 
    case 'dial':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello ${requestObject.params.username}`,
            description:
              'You are about to dial ' + requestObject.params.otherUser,
            textAreaContent:
            ` Please make sure, the following credentials are correct:
            Peer ID: ${requestObject.params.otherUserPeerId},
            Wallet: ${requestObject.params.otherUserWalletId}
            `,
          },
        ],
      });
    case 'answer':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ` + requestObject.params.username,
            description:
              'User' + requestObject.params.otherUser + ' is trying to connect to you with credentials: ' + requestObject.params.otherUserPeerId,
            textAreaContent: 'Message from user: ' + requestObject.params.message,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
});