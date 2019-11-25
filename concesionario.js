import React from 'react';
import { View,TextInput,TouchableOpacity,Text, Alert,ActivityIndicator,ListView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {

  static navigationOptions={
    title:'principal'
  }

  constructor(props){
    super(props)
    this.state = {

      TextInputIdentificacion: '',
      TextInputNombres: '',
      TextInputTelefono: '',
      TextInputDireccion: '',
      TextInputMarca: '',
      TextInputModelo: '',
      TextInputPlaca: ''


      
    }
  }

 


  InsertClientes = () =>{
    const {TextInputIdentificacion} = this.state;
    const {TextInputNombres} = this.state;
    const {TextInputTelefono} = this.state;
    const {TextInputDireccion} = this.state;
    const {TextInputMarca} = this.state;
    const {TextInputModelo} = this.state;
    const {TextInputPlaca} = this.state;

    

    fetch('http://192.168.43.242/PHP/Insertar_Clientes_autos.php',{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'content-Type':'application/json'
      },
      body: JSON.stringify({
        identificacion: TextInputIdentificacion,
        nombres: TextInputNombres,
        telefono: TextInputTelefono,
        direccion: TextInputDireccion,
        marca: TextInputMarca,
        modelo: TextInputModelo,
        placa: TextInputPlaca
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);


      }).catch((error) =>{
        console.error(error);
      })

  }


  ListaClientes = ()=>{
    this.props.navigation.navigate('second')
  }




  render() {
    return (

      <View style={{backgroundColor:'white', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:5 }}>


<TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
         placeholder= 'enter identificacion'
         onChangeText= {TextInpuValue =>this.setState({TextInputIdentificacion: TextInpuValue})}
         underLineColorAndroid = 'transparent'
        />

        <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
         placeholder= 'enter name'
         onChangeText= {TextInpuValue =>this.setState({TextInputNombres: TextInpuValue})}
         underLineColorAndroid = 'transparent'
        />

        <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
         placeholder= 'enter telefono'
         onChangeText= {TextInpuValue =>this.setState({TextInputTelefono: TextInpuValue})}
         underLineColorAndroid = 'transparent'
        />

        <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
          placeholder= 'enter Direccion'
          onChangeText= {TextInpuValue =>this.setState({TextInputDireccion: TextInpuValue})}
          underLineColorAndroid = 'transparent'
        />
        <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
          placeholder= 'enter marca'
          onChangeText= {TextInpuValue =>this.setState({TextInputMarca: TextInpuValue})}
          underLineColorAndroid = 'transparent'
        />

        
        <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
          placeholder= 'enter modelo'
          onChangeText= {TextInpuValue =>this.setState({TextInputModelo: TextInpuValue})}
          underLineColorAndroid = 'transparent'
        />

       <TextInput style={ {textAlign: 'center', height:40, width:'90%', borderWidth:1, marginBottom:7, borderRadius:5,borderColor:'#FF5722' }}
          placeholder= 'enter placa'
          onChangeText= {TextInpuValue =>this.setState({TextInputPlaca: TextInpuValue})}
          underLineColorAndroid = 'transparent'
        />

       <TouchableOpacity activeOpacity ={.4} onPress={this.InsertClientes}  style={{paddingTop:18,paddingBottom:18,borderRadius:5,marginBottom:7,width:'90%',backgroundColor:'#000cd4'}}>
         <Text style={{color:'#fff', textAlign:'center'}}>SAVE</Text>
       </TouchableOpacity >


       <TouchableOpacity activeOpacity ={.4} onPress={this.ListaClientes}style={{paddingTop:18,paddingBottom:18,borderRadius:5,marginBottom:7,width:'90%',backgroundColor:'#000cd4'}}>
         <Text style={{color:'#fff', textAlign:'center'}}>Lista Clientes</Text>
       </TouchableOpacity >
      </View>
    );
  }
}








class ListaClientes extends React.Component{
  static navigationOptions = {
    title : ' ListaClientes'
  }

  constructor(props){
    super(props)
    this.state ={
      isLoding: true
    }
    this.consulta =[];
  }

  componentDidMount(){

    return fetch ('http://192.168.43.242/PHP/Mostrar_Clientes_Autos.php')
             .then((response) => response.json())
             .then((responseJson) => {
               let ds = new ListView.DataSource({rowHasChanged: (r1 , r2) => r1 !==r2 });
               this.setState({
                 isLoding: false,
                 dataSource: ds.cloneWithRows(responseJson),

               },function(){
                 this.consulta = responseJson ;
               })

               }).catch((error) =>{
                 console.error(error);
               });

             
             }
  

  Action_Click(identificacion, nombres, telefono, direccion, marca , modelo , placa){

    Alert.alert(direccion, telefono, );
    
   
    

  }

  ListViewItemSeparator = () =>{
    return(

      <View style={{height:5, width:'100%', backgroundColor:'#2196f3'}}  />
    )
      

  }

  render(){

    if(this.state.isLoding){
      return(

        <View style={{flex:1, paddingTop:20, }}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(

      <View style={{flex:1, paddingTop:20, marginLeft:5, marginRight:5}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderSeparator = {this.ListViewItemSeparator}
          renderRow = {(rowData) =>
            <Text style={{textAlign: 'center', fontSize: 20,paddingTop:30,paddingRight:10,paddingBottom: 10}}
            onPress= {this.Action_Click.bind(this,

            
              
              rowData.identificacion,
              rowData.nombres,
              rowData.telefono,
              rowData.direccion,
              rowData.marca,
              rowData.modelo,
              rowData.placa

              


            )}>

               {rowData.nombres},
               {rowData.marca},
               {rowData.placa},
               {rowData.modelo},
               
               

            

            </Text>

          }

          />



        
      
      
      </View>
    )
      
    
  }
}

const AppNavigator = createStackNavigator({
  
  Home: {
    screen: HomeScreen},
    second:{ screen:ListaClientes}
    
  
});

export default createAppContainer(AppNavigator);
