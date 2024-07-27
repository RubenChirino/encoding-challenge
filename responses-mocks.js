/*
Fetching URL: https://ciphersprint.pulley.com/testuser@test.com
Request duration: 292ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_4f8f30ebb95965447689998055382906',
  encryption_method: 'nothing',
  expires_in: '60s',
  hint: 'go to /task_4f8f30ebb95965447689998055382906 to get the next challenge',
  instructions: 'encrypted_path is the path to your next challenge. encryption_method is how it was encrypted.',
  level: 0
}
Next path: task_4f8f30ebb95965447689998055382906

Fetching URL: https://ciphersprint.pulley.com/task_4f8f30ebb95965447689998055382906
Request duration: 237ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_NTNiNTFlZTRlMTc2YWY1YjZiZDJhODI1OGQ5YjY4NWQ=',
  encryption_method: 'encoded as base64',
  expires_in: '15s',
  hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
  instructions: 'encrypted_path is the path to your next challenge. encryption_method is how it was encrypted.',
  level: 1
}
Encoded path (base64): NTNiNTFlZTRlMTc2YWY1YjZiZDJhODI1OGQ5YjY4NWQ=
Decoded bytes: 53b51ee4e176af5b6bd2a8258d9b685d
Decoded path: 53b51ee4e176af5b6bd2a8258d9b685d
Next path: task_53b51ee4e176af5b6bd2a8258d9b685d

Fetching URL: https://ciphersprint.pulley.com/task_53b51ee4e176af5b6bd2a8258d9b685d
Request duration: 239ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_2de2bkd540b3367f410ih101l159cj5fe1eg03',
  encryption_method: 'inserted some non-hex characters',
  expires_in: '1s',
  hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
  instructions: 'encrypted_path is the path to your next challenge. encryption_method is how it was encrypted.',
  level: 2
}
Cleaned path: 2de2bd540b3367f410101159c5fe1e03
Next path: task_2de2bd540b3367f410101159c5fe1e03

Fetching URL: https://ciphersprint.pulley.com/task_2de2bd540b3367f410101159c5fe1e03
Request duration: 226ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_730ac4823d3a3bc369b9e4620437ccee',
  encryption_method: 'circularly rotated left by 25',
  expires_in: '1s',
  hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
  instructions: "we've been alerted that you reached level 3, keep going!",
  level: 3
}
Rotation number: 25
Original path: 730ac4823d3a3bc369b9e4620437ccee
Rotated string with 25 characters: 23d3a3bc369b9e4620437ccee730ac48
Next path: task_23d3a3bc369b9e4620437ccee730ac48

Fetching URL: https://ciphersprint.pulley.com/task_23d3a3bc369b9e4620437ccee730ac48
Request duration: 239ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_0c6dacdcfd88d167400e84d6b6e6d63a',
  encryption_method: 'hex decoded, encrypted with XOR, hex encoded again. key: secret',
  expires_in: '1s',
  hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
  instructions: "we've been alerted that you reached level 4, keep going!",
  level: 4
}
XOR key: secret
Decrypted path: 7f08cfae98fca202237ce1a2c583b548
Next path: task_7f08cfae98fca202237ce1a2c583b548

Fetching URL: https://ciphersprint.pulley.com/task_7f08cfae98fca202237ce1a2c583b548
Request duration: 246ms
Response data: {
  challenger: 'testuser@test.com',
  encrypted_path: 'task_13d3b0d59d3cbcffb16bb6161e535f1f',
  encryption_method: 'scrambled! original positions as base64 encoded messagepack: 3AAgAx8ZGwcUDwwICQ4cHQoSHgIGEQETBBcQGBoNCwAVBRY=',
  expires_in: '1s',
  hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
  instructions: "we've been alerted that you reached level 5, keep going!",
  level: 5
}
*/