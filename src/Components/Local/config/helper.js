export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender === m.sender &&
    messages[i].sender !== userId
  )
    return 2;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender !== m.sender &&
      messages[i].sender !== userId) ||
    (i === messages.length - 1 && messages[i].sender !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender === m.sender;
};