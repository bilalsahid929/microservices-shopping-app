import { genSalt, hash } from "bcrypt";
import axios from "axios";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { APP_SECRET } from "../config/index.js";

//Utility functions
export async function GenerateSalt() {
  return await genSalt();
}

export async function GeneratePassword(password, salt) {
  return await hash(password, salt);
}

export async function ValidatePassword(enteredPassword, savedPassword, salt) {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
}

export async function GenerateSignature(payload) {
  try {
    return await sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function ValidateSignature(req) {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function FormateData(data) {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
}

//Raise Events
export async function PublishCustomerEvent(payload) {
  // axios.post("http://customer:8001/app-events/", {
  //   payload,
  // });

  axios.post(`http://localhost:8000/customer/app-events/`, {
    payload,
  });
}
