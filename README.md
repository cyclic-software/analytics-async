# analytics-async

An ASYNC Node.js client for [Segment](https://segment.com) — The hassle-free way to integrate analytics into any application.

**BETA SOFTWARE NOTICE** this library is still in beta.

<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/53616724-d409f180-3b98-11e9-9d39-553c958ecf99.png"/>
  <p><b><i>You can't fix what you can't measure</i></b></p>
</div>

And the `analytics-node` library will drop your api calls in [some situations](https://github.com/segmentio/analytics-node/issues/309).

## How is this different from 

This library is intended to be a drop-in replacement for the Segment.io library `analytics-node`

Except: each of the calls (track, identify, etc) return promises that you can await if you wish to ensure the message is delivered before you exit your lambda.
