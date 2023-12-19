  // pre-load all these .svgs:
  const foodEmojiSVGPaths = ["watermelon.svg","banana.svg","blueberries.svg","cherries.svg","egg.svg","grapes.svg","green-apple.svg","ice-cream.svg","kiwi.svg","mouse.svg","pineapple.svg","red-apple.svg","strawberry.svg","tangerine.svg"]
  // map over the array of paths to get an Image for each one
  const foodEmojiImages = foodEmojiSVGPaths.map(path => {
    const img = new Image();
    img.src = "./emoji-svgs/"+path;
    return img;
  });

  const eyesEmojiImage = new Image();
  eyesEmojiImage.src = "./emoji-svgs/eyes.svg";