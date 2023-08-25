import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import url from 'url';
import {parse} from "url"

export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    // const { email, password } = req.body

    if(!email || !password) {
      throw new Error('Email and password are required');
    }

    console.log('Use these credentials to log the user in somewhere:', { email, password });

    // Validate email and password is a correct user, and get the user information

    // User being logged into ReadMe
    // At this point, we're hardcoding in a user's name to mock sending in a valid user
    const user = {
      name: email,
      email: email,

      // User's API Key (OR) { user, pass }
      apiKey: { user: email, pass: email },

      version: 1, // Required, if omitted things can break unexpectedly

      // You can pass in any information here and use it in your documentation!
      // Full list of data that has special meaning in our API Explorer: https://docs.readme.com/docs/passing-data-to-jwt
    };

    const jwt = sign(user, process.env.JWT_SECRET);
    const hubURL = new url.URL("https://pena-team-sandbox.readme.io/docs");
    hubURL.searchParams.set('auth_token', jwt);
    console.log('Redirecting to:', hubURL.toString());
    
    const resUrl = parse(hubURL.toString()).href;

    return new NextResponse(resUrl, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
}