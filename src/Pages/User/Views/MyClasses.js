import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import API from '../../../API';
import LoadingScreen from '../../../Components/Loading';

const MyClasses = () => {
  const [ dances, setDances ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    API.getRegistrations(user.id)
    .then(response => response.json())
    .then(json => {
      setDances(json);
      setIsLoading(false);
    })
    .catch(e => console.log(e));
  }, []);

  return (
    <ScrollView>
      { isLoading && <LoadingScreen /> }
      {
        dances.map((item, i) => (
          <ListItem
            key={ i }
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>
                { `${item.course.title} - ${item.course.sub_header}` }
              </ListItem.Title>
              <ListItem.Subtitle>
                { `${item.course.time_from} - ${item.course.time_to}` }
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </ScrollView>
  );
};

export default MyClasses;
