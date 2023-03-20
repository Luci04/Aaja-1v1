export const getRandomdp = () => {
    const avatar = [
      "https://i.pinimg.com/originals/57/47/06/57470642bba41d1b079cb9926117fe6e.jpg",
      "https://i.pinimg.com/564x/af/a7/77/afa7776d9f3ccd2048c4a705206800e0.jpg",
      "https://i1.sndcdn.com/avatars-000542389239-i206kr-t500x500.jpg",
      "https://i.pinimg.com/564x/8f/71/ef/8f71ef77c4bbcab3006c8a5d77d67879.jpg",
      "https://i.pinimg.com/736x/f1/b4/47/f1b44707422d70b59e82269f7d737b5b.jpg"
    ];
  
    return avatar[Math.floor(Math.random() * avatar.length)];
  };