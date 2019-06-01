const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const StreamChat = require('stream-chat').StreamChat;

require("dotenv").config();
const app = express();

const server_side_client = new StreamChat(
  process.env.APP_KEY,
  process.env.APP_SECRET
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send('all green!');
});

app.post("/auth", async (req, res) => {
  const user_id = req.body.user_id;
  console.log('user ID: ', user_id);
  if (!user_id) {
    return res.status(400);
  }

  return res.send({
    token: server_side_client.createToken(user_id)
  });
});

app.get("/create-channel", async (req, res) => {
  const user_id = req.query.user_id;
  const sample_channel = server_side_client.channel('messaging', 'sample-room1', {
    name: 'Sample Room 1',
    image: 'http://bit.ly/2O35mws',
    created_by_id: user_id,
  });

  const create_channel = await sample_channel.create();
  console.log("channel: ", create_channel);

  res.send('ok');
});


app.post("/add-member", async (req, res) => {
  const user_id = req.body.user_id;
  const sample_channel = server_side_client.channel('messaging', 'sample-room1');
  const add_member = await sample_channel.addMembers([user_id]);
  console.log("members: ", add_member);
  res.send('ok');
});


app.get("/send-message", async (req, res) => {
  const user_id = req.query.user_id;
  const sample_channel = server_side_client.channel('messaging', 'sample-room1');

  const text = `hi from ${user_id}`;
  const message = {
    text,
    user_id,
  }
  const send_message = await sample_channel.sendMessage(message);
  console.log('send message: ', send_message);

  res.send('ok');
});


const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});