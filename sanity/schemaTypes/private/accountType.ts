export const accountType = {
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    { name: 'userId', type: 'string' },
    { name: 'providerId', type: 'string' },
    { name: 'accountId', type: 'string' },
    { name: 'accessToken', type: 'string' },
    { name: 'refreshToken', type: 'string' },
    { name: 'idToken', type: 'string' },
    { name: 'expiresAt', type: 'number' },
  ],
};