const crypto = require('crypto');

/**
 * pow函数：计算满足零数量的哈希值
 * @param {string} name - 用户昵称
 * @param {number} numbersOfZeros - 目标零的数量
 * @returns {object} 包含哈希结果 + nonce
 */
const pow = (name, numbersOfZeros) => {
  let nonce = 0;
  let hash = '';
  const startTimestamp = Date.now();

  while (!hash?.startsWith('0'.repeat(numbersOfZeros))) {
    let content = name + nonce;
    // 使用Node.js的crypto模块
    hash = crypto.createHash('sha256').update(content).digest('hex');
    nonce++;
  }

  const endTimestamp = Date.now();
  console.log(`满足开头${numbersOfZeros}个0, 找到目标哈希: ${hash}`);
  console.log(`满足开头${numbersOfZeros}个0, 正确nonce: ${nonce - 1}`);
  console.log(`满足开头${numbersOfZeros}个0, 耗时: ${endTimestamp - startTimestamp}ms`);

  return { hash, nonce: nonce - 1 };
};

// async function main() {
//   pow('clay', 4);
//   pow('clay', 5);
// }

// main();

/**
 * 生成RSA密钥对
 * @returns {Object} 包含公钥+私钥
 */
const genKeyPairs = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return {
    publicKey,
    privateKey,
  };
};

/**
 *
 * @param {string} data
 * @param {string} privateKey
 * @returns {string} 签名
 */
const sign = (data, privateKey) => {
  const sign = crypto.createSign('sha256');
  sign.update(data);
  return sign.sign(privateKey, 'hex');
};

/**
 *
 * @param {*} data
 * @param {*} sign
 * @param {*} publicKey
 * @returns
 */
const verify = (data, sign, publicKey) => {
  const verify = crypto.createVerify('sha256');
  verify.update(data);
  return verify.verify(publicKey, sign, 'hex');
};

const main = () => {
  const { publicKey, privateKey } = genKeyPairs();
  const { nonce } = pow('clay', 4);
  console.log('nonce: ', nonce);
  const content = 'clay' + nonce;
  const signature = sign(content, privateKey);
  console.log('signature: ', signature);
  const result = verify(content, signature, publicKey);
  // 验证结果
  console.log('result: ', result);
};

main();
