I have built this simple app which you can authenticate into and create a new piece of heart rate data with React-Native.
I know the instructions specified Java for an Android app or Swift for an iOS. I figured it would be easier to just create both an Android and iOS app in one with React-Native.

I have used Googles Firebase as my tool for authentication.
Once the user authenticates, their username is stored in a Firebase database.
From there, the data which the user inserts on their dashboard (in this particular case, their heart rate), is applied to their personal table in Firebase.

I use a Redux action creator to retrieve the data from Firebase. After sending it through a reducer, the data is rendered to the screen instantaneously through a componentWillReceiveProps lifecycle method.

RESTful practices.
The API provided in the instructions was not responding to the GET and POST requests, so I am going to provide some RESTful code containing hypermedia which can be used on your API from your end.
I thought, for the purposes of being able to actually see the data after POSTing it, I would use Firebase as a REST-like API for this app.
Since I am using the Firebase API to POST the data, there is some minor changes which need to be made to make it RESTful and able to be sent to a Prenetics API.

To use a RESTful design on the Prenetics API, I would implement something similar to the following:

export const createGenetic = ({ heartRateObj }) => {
  return () => {
    const { customerId } = firebase.auth();
    axios.post(`/customers/${customerId}/heartRate`)
      heartRateObj
  };
};

The GET back from the Prenetics API might look something similar to the following:

In XML:

<preneticsAPI version="1.0">
 <heartRate href="/heartRate/M" rel="current">
 <title>Customer Heart Rate</title>
 <link rel="edit" href="/{customerId}/heartRate/{id}"/>
 <link rel="delete" href="/{customerId}/heartRate/{id}"/>
 </heartRate>
</preneticsAPI>

In JSON:

{
  preneticsAPI: {
    "version": "1.0"
  },
  "path": "/{customerId}/heartRate/{id}"
}
