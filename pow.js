// const calcHash = async (name, numbersOfZeros) => {
//   const encoder = new TextEncoder();
//   let nonce = 0;
//   let hash = '';
//   const startTimestamp = Date.now();

//   while (!hash?.startsWith('0'.repeat(numbersOfZeros))) {
//     let content = name + nonce;
//     const data = encoder.encode(content);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);

//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
//     nonce++;
//   }

//   const endTimestamp = Date.now();
//   console.log(`满足开头${numbersOfZeros}个0, 找到目标哈希: ${hash}`);
//   console.log(`满足开头${numbersOfZeros}个0, 正确nonce: ${nonce - 1}`);
//   console.log(`满足开头${numbersOfZeros}个0, 耗时: ${endTimestamp - startTimestamp}ms`);

//   return hash;
// };

// async function main() {
//   await calcHash('clay', 4);
//   await calcHash('clay', 5);
// }

// main();

const crypto = require('crypto');

const calcHash = async (name, numbersOfZeros) => {
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

  return hash;
};

async function main() {
  await calcHash('clay', 4);
  await calcHash('clay', 5);
}

main();