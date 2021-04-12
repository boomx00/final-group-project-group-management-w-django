import React from 'react'
import { KeyboardAvoidingView, ScrollView,StyleSheet,Text, View,TouchableOpacity,TextInput} from 'react-native'
//import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
//import { Title } from 'react-native-paper';
import {connect} from 'react-redux'
import colors from '../../../assets/colors/colors'
import normalize from 'react-native-normalize';


const Group = ({ownGroup}) => {
    const navigation = useNavigation();

    const inGroup =()=>(
        <View style={{ flex: 1, backgroundColor: colors.textlight }}>
        <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>
            <View style={styles.header}>
            <Text style={styles.text}>MY GROUP</Text>
            </View>
        <View style={styles.top}>
        <Ionicons name="people-outline"
              size={50} 
             >
             </Ionicons>
             <View style={styles.topin}>
                 <Text style={styles.project}>{ownGroup.topic}</Text>
                 <Text style={styles.group}>{ownGroup.groupName}</Text>
                 <Text style={styles.group}>../7</Text>
                 </View>
     <View style={styles.y}>
    <Text style={styles.aprval}> APPROVED</Text>
    </View>

            </View>
        <View style = {styles.content}>
        <Text style={styles.labell}>Project Description:</Text>
        <View style={{marginLeft:10}}>
        <Text style={styles.desc}>{ownGroup.description}</Text>
        </View>

        <Text style={styles.labell}>Roles:</Text>
        <View style={{marginLeft:10}}>
        <Text style={styles.desc}>{ownGroup.roles}</Text>

        </View>
        <Text style={styles.labell}>Azure DevOps Link:</Text>
        <View style={{marginLeft:10}}>
        <Text style={styles.desc}>{ownGroup.AzureD}</Text>
        </View>

        <Text style={styles.labell}>GitHub Link:</Text>
        <View style={{marginLeft:10}}>
        <Text style={styles.desc}>{ownGroup.GitHub}</Text>
        </View>
        <Text style={styles.labell}>Sprints:</Text>
            <View style={styles.sprints}>
            <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 1"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 2"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 3"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 4"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 5"
              })}>
                               </Ionicons>

                 </View>

            
             </View>

             </ScrollView>

        </KeyboardAvoidingView>

        </View>
    )
    const notInGroup =()=>(
        <View style={styles.view1}>
        <View style={styles.header}>
        <Text style={styles.text}>MY GROUP</Text>
    </View>
    <View style={styles.items}>
    <Ionicons name="people-outline"
          size={70} 
         >
         </Ionicons>
         <Text style={styles.title}>YOU ARE NOT </Text>
         <Text style={styles.title}>REGISTERED IN </Text>
         <Text style={styles.title}>ANY GROUP</Text>
         <TouchableOpacity
                style={styles.button1}
                onPress={() => navigation.navigate("Home")}
        >
                <Text>FIND A GROUP</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={() => navigation.navigate("Groupn")}
        >
             
                <Text>CREATE A GROUP</Text>
            </TouchableOpacity>
         </View>
    </View>
    )

    return (       
        <View style={{flex:1}}>
        {ownGroup != null? inGroup() :notInGroup() }
        </View>
  
    )
}
const styles = StyleSheet.create({
    desc:{
        fontSize:14,
        color:'black',
        marginTop:5,
        marginBottom:5
    },
    txt:{
        fontSize:14,
        fontWeight:'bold',
        color: 'white'
    },
    button:{
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(300),
        height: normalize(40),
        margin: normalize(10),
        borderRadius: normalize(10),
        backgroundColor: '#0000CC',
    },
    aprval:{
        fontSize:8,
        textAlign:'center',
        color:'white'
    },
    y:{
        width:60,
        height:20,
        backgroundColor:'green',
        borderRadius:12,
        marginLeft:20,
        marginTop:5,
        justifyContent:'center'

    },
    n:{
        width:60,
        height:20,
        backgroundColor:'grey',
        borderRadius:12,
        marginLeft:20,
        marginTop:5,
        justifyContent:'center'

    },
    project:{
        width:150,
        fontWeight:'bold',
        fontSize:18
    },
    group:{
        fontSize:12,
        marginTop:5,
        color:'grey'

    },
    topin:{
        marginLeft:30
    },
    top:{
        flexDirection:'row',
        marginRight:20,
        marginLeft:20,
        marginTop:10
    },
    arrow:{
        top:10,
        left:10,
        position:'absolute',
        color:'black'
        },
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',
        

        
         }, 
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
    },
    fab: {
        marginTop:5,
        marginRight:17,
        marginLeft:17,
        
    },
    sprints:{
        flexDirection:'row',
        
    },
    pagetitle:{
        marginTop:20,
        marginBottom:10,
        backgroundColor:"white",
        textAlign:'center',
        alignSelf:'center',
        borderBottomColor:'orange',
        borderBottomWidth:3,
        width:'90%',
        height: 80,
        borderRadius:8,

    },
    Text: {
        marginTop: 5,
        fontSize: 20,
        textAlign:'center',
        color:'black',

    },
    Textsml: {
        marginTop:1,
        fontSize: 16,
        textAlign:'center',
        color:'grey',

    },
    content:{
        marginLeft:20,
        marginRight:20,
        marginTop:10

        },
    labell:{
        marginTop:5,
        fontSize:14,
        fontWeight:'bold',
        color:'black',

    },
    view1:{
        flex:1,
        backgroundColor: 'orange',        
    },
    button1:{
        marginTop:40,
        width:292,
        height:50,
        backgroundColor: 'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },

    button2:{
        marginTop:20,
        width:292,
        height:50,
        backgroundColor: 'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },

    items:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:70
        
    },
    title:{
        fontSize:20
    },
    view1:{
        flex:1,
    }

})
const mapStateToProps = (state) => ({
    ownGroup: state.group.ownGroup
})
export default connect(mapStateToProps, null)(Group)