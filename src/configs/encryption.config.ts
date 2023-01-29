import { dot } from 'dot-object';
import { chain, cloneDeep, set } from 'lodash';

export const loadEncryptionConfig = () => ({
  key: process.env.ENCRYPTION_KEY,
});

export const getEncryptionConfigKeys = () => {
  return chain(loadEncryptionConfig())
    .thru(dot)
    .keys()
    .reduce((keys, path) => set(keys, path, path), cloneDeep(loadEncryptionConfig()))
    .value();
};
