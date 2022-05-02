import React from 'react';
import { Box, Typography } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Box sx={{margin:2, marginTop:8, marginBottom:10}}>
      <Typography variant="h6">
        About This App
      </Typography>
      <Typography sx={{mt:1, fontSize:12}}>
      This application is designed to track exposures used in exposure therapy.
      Exposure therapy is a technique used for treating a range of disorders including
      generalized anxiety, social anxiety, PTSD, and obsessive-compulsive disorder.
       It uses systematic confrontation of feared stimuli within safe settings to retrain 
       the brain and help the individual dehabitualize their fear response to the targeted stimuli. 
      </Typography>
      <Typography sx={{mt:1, fontSize:12}}>
      Exposure hierarchy is a tool that guides how an individual progresses through exposures. 
      The hierarchy is a list of situations generated by the individual and specific to their experiences 
      that trigger the targeted fear response. Each situation receives a ranking between 1 and 10 and 
      should be a  scenario the individual can repeat. The goal is also to include situations that 
      cause a range of distress levels. The individual begins with the lowest ranking  scenario and 
      repeatedly exposes themselves to the situation while also tracking their pre, peak, and post level of distress. Tracking distress levels provides feedback about the individual’s 
      habitation to the situation, as well as indicates when it’s appropriate to move up to the next 
      scenario in the hierarchy.
      </Typography>
      <Typography sx={{mt:1, fontSize:12}}>
      Exposures are inherently unpleasant and require willingness and determination to repeatedly 
      expose oneself to distressing experiences.  The goal of this app is to both track the user’s 
      progress as well as give the user a sense of accomplishment and self-efficacy as they work 
      their way through an exposure hierarchy.
      </Typography>
      <Typography variant="h6" sx={{mt:3}}>
        Technologies Used
      </Typography>
      <Typography sx={{mt:1, fontSize:12}}>
        React, Redux, Node, Express, Material UI, ChartJS, JSCharting 
      </Typography>
      <Typography sx={{mt:4, fontWeight:500, fontSize:16}}>
        Thank you to Prime Digital Academy, Dane Smith, Butler Cohort, and my wonderful family.
      </Typography>
      <Typography align="center" sx={{mt:4}}>
      &copy; Maggie Jenkins
      </Typography>
    </Box>
  );
}

export default AboutPage;
