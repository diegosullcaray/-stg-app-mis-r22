
import * as Moments from 'moment';
import { DateService } from '../services/date.service';

export function renderDates_1(){
  const date=new DateService();
  let now_end=Moments().add(-1,'days');;
  let now_start=Moments().add(-5,'months').endOf('month');
  let data =date.dataRange(now_start,now_end).reverse()

  return {
    label:'Fecha Cierre',
    selected:data[1].id,
    data:data
  }
}
export function renderDate_Hoy(){
  const date=new DateService();
  let now_end=Moments().add(-1,'days');
  //console.log(now_end)
  let now_start=Moments().add(0,'days');
  //let now_start = Moments().add(-1, 'days').format("YYYYMMDD");
  let data = date.dataRange(now_start,now_end)[1]//.reverse()
  var dataHoy = []
  dataHoy.push(data)
  //console.log(dataHoy)
  return {
    label:'Fecha Cierre',
    selected:dataHoy[0].id,
    data:dataHoy
  }
}

export function renderDates_2(){
  const date=new DateService();
  let now_end=Moments().add(-1,'days');;
  let now_start=Moments().add(-12,'months').endOf('month');
  let data =date.dataRange(now_start,now_end).reverse()

  return {
    label:'Fecha Cierre',
    selected:data[1].id,
    data:data
  }
}

export function FAE_OPT01(){
  return {
    label:'Cartera',
    selected:1,
    data:[{desc:"TOTAL",id:1},{desc:"PROGRAMAS DEL GOBIERNO",id:2},{desc:"SIN PROGRAMAS DEL GOBIERNO",id:3}]
  }
}

export function GCOVID_OPT01(){
  return {
    label:'Tipo',
    selected:1,
    variable:'car',
    data:[{desc:"Operaciones",id:1},{desc:"Saldo",id:2}]
  }
}

export function Tipo01(){
  return {
    label:'Tipo',
    selected:1,
    data:[{desc:"TRAMO",id:1},{desc:"PLAZO",id:2}]
  }
}

export function Canal01(){
  return {
    label:'Canal',
    selected:101,
    data:[{desc:"RED DE AGENCIAS",id:101},{desc:"BANCA PREFERENTE",id:102}]
  }
}

export function Tipo02(){
  return {
    label:'Tipo',
    selected:0,
    data:[{desc:"PRODUCTO",id:0},{desc:"CANAL",id:10}]
  }
}
export function SCANALRED(){
  return {
    label:'Canal',
    selected:'RED',
    variable:'canal', 
    data:[
      { id: 'RED', desc: 'Red' }/*,
      { id: 'OPERACIONES', desc: 'Operaciones' }*/
    ]
  }
}

export function SPRODUCTOMISI(){
  return {  
    label:'Productos',
    selected:'TODOS',
    variable:'canal', 
    data:[
      { id: 'TODOS', desc: 'TODOS' },
      { id: 'Agua y Saneamiento', desc: 'Agua y Saneamiento' },
      { id: 'Crédito Educativo', desc: 'Crédito Educativo' },
      { id: 'Emprendimiento Mujer', desc: 'Emprendimiento Mujer' },
      { id: 'Producto verde', desc: 'Crédito Verde' }
    ]
  }
}


export function Segmento(){
  return {
    label:'Segmento',
    selected:'TODOS',
    variable:'segmento', 
    data:[
      { id: 'TODOS', desc: 'Todos' },
      { id: 'Mujer', desc: 'Mujer' },
      { id: 'Rural', desc: 'Rural' },
      { id: 'Urbano', desc: 'Urbano' },
      { id: 'Migrantes', desc: 'Migrantes' }
      
    ]
  }
}

export function SPRODUCTO(){
  return {
    label:'Producto',
    selected:'TODOS',
    variable:'prod', 
    data:[
      { id: 'TODOS', desc: 'TODOS' },
      { id: 'AHORROS', desc: 'AHORROS' },
      { id: 'CTS', desc: 'CTS' },
      { id: 'PLAZO FIJO', desc: 'DPF' }
      

    ]
  }
}

export function SPRODUCTO_(){
  return {
    label:'Producto',
    selected:'TODOS',
    variable:'prod', 
    data:[
      { id: 'TODOS', desc: 'TODOS' },
      { id: 'AHORROS', desc: 'AHORROS' },
      { id: 'CTS', desc: 'CTS' },
      { id: 'PLAZO FIJO', desc: 'DPF' },
      { id: 'AHORRO+PLAZO FIJO', desc: 'AHORRO+PLAZO FIJO' }
      

    ]
  }
}

export function SCARGAAMBIENTAL(){
  return {
    label:'Carga Ambiental',
    selected:'TODOS',
    variable:'cargambiental', 
    data:[
      { id: 'TODOS', desc: 'Todos' },
      { id: '45130106010000', desc: 'Energia' },
      { id: '45130106020000', desc: 'Agua' },
      { id: '45130111010105', desc: 'Combustibles' },
      { id: '45130111010113', desc: 'Papel' },
      { id: '45130101040000', desc: 'Aéreos' }
      
    ]
  }
}
export function SCANALOPE(){
  return {
    label:'Canal',
    selected:'OPERACIONES',
    variable:'canal', 
    data:[
      { id: 'OPERACIONES', desc: 'Operaciones' }/*,
      { id: 'OPERACIONES', desc: 'Operaciones' }*/
    ]
  }
}
export function GRUPCIIU(){
  return {
    label:'Grupo',
    //disabled:'0',
    selected:'0',
    variable:'grup', 
    
    data:[
      { id: '0', desc: 'Todos' }/*,
      { id: 'A', desc: 'AGROPECUARIO' },
      { id: 'B', desc: 'PESCA' },
      { id: 'C', desc: 'MINERIA' },
      { id: 'D', desc: 'MANUFACTURA' },
      { id: 'E', desc: 'ELECTRICIDAD' },
      { id: 'F', desc: 'CONSTRUCCION' },
      { id: 'G', desc: 'COMERCIO' },
      { id: 'H', desc: 'SERVICIOS' },
      { id: 'I', desc: 'TRANSPORTE' },
      { id: 'J', desc: 'INTERMEDIACION FINANCIERA' },
      { id: 'K', desc: 'ACT.INMOVILIARIA' },
      { id: 'L', desc: 'ADM.PUBLICA' },
      { id: 'M', desc: 'ENSEÑANZA' },
      { id: 'N', desc: 'SERVICIOS SOCIALES' },
      { id: 'O', desc: 'OTRAS ACT.SERVICIO' },
      { id: 'R', desc: 'CONSUMO' },
      { id: 'S', desc: 'HIPOTECARIO' },
      */
    ]
  }
}

export function Variable01(){
  return {
    label:'Variable',
    selected:'1',
    variable:'codvar', 
    data:[
      { id: '1', desc: 'Saldo Capital' },
      { id: '2', desc: 'Mora' },
      { id: '3', desc: 'Monto Desembolsado' },
      { id: '4', desc: 'Operaciones Desembolsadas' },
      { id: '5', desc: 'Clientes Nuevos' },
      { id: '6', desc: 'Castigos' }
    ]
  }
}

export function Categoria01(){
  return {
    label:'Categoria',
    selected:'0',
    variable:'codcat',
    data:[
      { id: '0', desc: 'TODOS' },
      { id: '1', desc: 'EN FORMACIÓN' },
      { id: '2', desc: 'EN FORMACIÓN PDM' },
      { id: '3', desc: 'FUNCIONARIO' },
      { id: '4', desc: 'FUNCIONARIO PDM' },
      { id: '5', desc: 'JUNIOR 1' },    
      { id: '6', desc: 'JUNIOR 1 PDM' },
      { id: '7', desc: 'JUNIOR 2' },    
      { id: '8', desc: 'JUNIOR 2 PDM' },    
      { id: '9', desc: 'MASTER' },
      { id: '10', desc: 'MASTER PDM' },
      { id: '11', desc: 'SENIOR' },
      { id: '12', desc: 'SENIOR PDM' },
      { id: '13', desc: 'SIN CATEGORIA' }
    ]
  }
}

export function Semana01(){
  return {
    label:'Semana',
    selected:1,
    variable:'sem',
    data:[
      {id:1, desc:'Semana 1'},
      {id:2, desc:'Semana 2'},
      {id:3, desc:'Semana 3'},
      {id:4, desc:'Semana 4'}
    ]
  }
}
export function NivelFuga(){
  return {
    label:'Nivel de Fuga',
    selected:0,
    variable:'fuga',
    data:[
      {id:0, desc:'Todos'},
      {id:1, desc:'Nivel de fuga Alto'},
      {id:2, desc:'Nivel de fuga Medio'},
      {id:3, desc:'Nivel de fuga Bajo'}
    ]
  }
}
export function NivelProp(){
  return {
    label:'Nivel de Propension',
    selected:0,
    variable:'prop',
    data:[
      {id:0, desc:'Todos'},
      {id:1, desc:'Nivel de Prop Alto'},
      {id:2, desc:'Nivel de Prop Medio'},
      {id:3, desc:'Nivel de Prop Bajo'}
    ]
  }
}
export function renderDates_3(){
  const date=new DateService();
  let now_end=Moments().add(-1,'days');;
  let now_start=Moments().add(-11,'months').endOf('month');
  let data =date.dataRange(now_start,now_end).reverse()

  return {
    label:'Fecha Base',
    selected:data[1].id,
    data:data
  }
}

export function renderDates_4(){
  const date=new DateService();
  let now_end=Moments().add(-1,'days');;
  let now_start=Moments().add(-11,'months').endOf('month');
  let data =date.dataRange(now_start,now_end).reverse()
 // console.log(data)
  return {
    label:'Fecha Base',
    selected:data[1].id,
    data:data
  }
}

export function Productos01(){
  return {
    label:'Producto',
    selected:'TODO',
    variable:'prod',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'AGROPECUARIO', desc:'AGROPECUARIO'},
      {id:'CONSTRUYENDO CONFIANZA', desc:'CONSTRUYENDO CONFIANZA'},
      {id:'CONSUMO', desc:'CONSUMO'},
      {id:'EMPRENDIENDO CONFIANZA', desc:'EMPRENDIMIENTO CONFIANZA'},
      {id:'GARANTIA LIQUIDA', desc:'GARANTIA LIQUIDA'},
      {id:'PALABRA DE MUJER', desc:'PALABRA DE MUJER'},
      {id:'TRABAJADORES FC', desc:'TRABAJADORES FC'},
      {id:'HIPOTECARIO', desc:'HIPOTECARIO'}
    ]
  }
}

export function SubProducto01(){
  return {
    label:'Sub Producto',
    selected:'TODO',
    variable:'subpro',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'AGROPECUARIO CUOTAS', desc:'AGRO CUOTAS'},
      {id:'AGROPECUARIO VCTO', desc:'AGRO VCTO'},
      {id:'CONSTRUYENDO CONFIANZA', desc:'CONSTRUYENDO CONFIANZA'},
      {id:'CONSUMO CUOTAS', desc:'CONSUMO'},
      {id:'CRÉDITO EDUCATIVO', desc:'CREDITO EDUCATIVO'},
      {id:'EMPRENDIENDO CONFIANZA CUOTAS', desc:'EMP CONFIANZA CUOTAS'},
      {id:'EMPRENDIENDO CONFIANZA VCTO', desc:'EMP CONFIANZA VTO'},
      {id:'GARANTIA LIQUIDA', desc:'GARANTIA LIQUIDA'},
      {id:'HIPOTECARIO', desc:'HIPOTECARIO'},
      {id:'INICIANDO CONFIANZA', desc:'INICIANDO CONFIANZA'},
      {id:'PDM', desc:'PDM'},
      {id:'TRABAJADORES FC', desc:'TRABAJADORES FC'}
    ]
  }
}

export function Maduracion01(){
  return {
    label:'Maduracion',
    selected:'3', 
    variable:'madu',
    data:[
      {id:'3', desc:'3 MESES'},
      {id:'6', desc:'6 MESES'},
      {id:'9', desc:'9 MESES'},
      {id:'12', desc:'12 MESES'}
    ]
  }
}

export function CargoAutonomia(){
  return {
    label:'Cargo',
    selected:'', 
    variable:'cargo',
    data:[
      {id:'', desc:'TODO'},
      {id:'Administrador', desc:'ADMINISTRADOR'},
      {id:'GERENTE DE CORREDOR', desc:'GERENTE DE CORREDOR'},
      {id:'Asesor', desc:'ASESOR'}
    ]
  }
}


export function PREMaduracion01(){
  return {
    label:'NR3M',
    selected:'1', 
    variable:'precosecha',
    data:[
      {id:'1', desc:'1'},
      {id:'2', desc:'2'}
    ]
  }
}


export function Tipo03(){
  return {
    label:'Tipo',
    selected:'Saldo',
    variable:'op',
    data:[
      {id:'Saldo', desc:'SALDO'},
      {id:'Operacion', desc:'OPERACION'}
    ]
  }
}
/*
export function OperacionSaldo01(){
  return {
    label:'Operación / Saldo',
    selected:'TODO',
    variable:'operacionof',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'ope', desc:'Operación'},
      {id:'saldo', desc:'Saldo'},
    ]
  }
}*/
 
export function precosecha01(){
  return {
    label:'Precosecha',
    selected:'TODO',
    variable:'precosechaf',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'3', desc:'3 Meses'},
      {id:'6', desc:'6 Meses'}
    ]
  }
} 
export function Tramo01(){
  return {
    label:'Tramo',
    selected:'TODO',
    variable:'tramof',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'0. -30', desc:'0. -30'},
      {id:'1. -30-0', desc:'1. -30-0'},
      {id:'2. 1-30', desc:'2. 1-30'},
      {id:'3. 31-60', desc:'3. 31-60'},
      {id:'4. 61-90', desc:'4. 61-90'},
      {id:'5. 91-120', desc:'5. 91-120'},
      {id:'6. 121-150', desc:'6. 121-150'},
      {id:'7. 151-180', desc:'7. 151-180'},
      {id:'8. >180', desc:'8. >180'},
      {id:'9. Judicial', desc:'9. Judicial'},
    ]
  }
}

export function Terr01(){
  return {
    label:'Territorio',
    selected:'TODO',
    variable:'Ter',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'CENTRO ORIENTE', desc:'CENTRO ORIENTE'},
      {id:'LIMA', desc:'LIMA'},
      {id:'NOR ANDINO', desc:'NOR ANDINO'},
      {id:'SUR', desc:'SUR'}
    ]
  }
}

export function Producto01(){
  return {
    label:'Producto',
    selected:'TODO',
    variable:'prod',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'AGROPECUARIO', desc:'AGROPECUARIO'},
      {id:'CONSTRUYENDO CONFIANZA', desc:'CONSTRUYENDO CONFIANZA'},
      {id:'CONSUMO', desc:'CONSUMO'},      
      {id:'CREDITO EDUCATIVO', desc:'CREDITO EDUCATIVO'},
      {id:'CREDITOS FAE', desc:'CREDITOS FAE'},
      {id:'CREDITOS REACTIVA', desc:'CREDITOS REACTIVA'},
      {id:'EMPRENDIENDO CONFIANZA', desc:'EMPRENDIENDO CONFIANZA'},      
      {id:'GARANTIA LIQUIDA', desc:'GARANTIA LIQUIDA'},      
      {id:'HIPOTECARIO', desc:'HIPOTECARIO'},
      {id:'INCLUSION FAE MUJER', desc:'INCLUSION FAE MUJER'},
      {id:'INICIANDO CONFIANZA', desc:'INICIANDO CONFIANZA'},
      {id:'TRABAJADORES FC', desc:'TRABAJADORES FC'},
      {id:'INICIANDO CONFIANZA PYME', desc:'INICIANDO CONFIANZA PYME'},
      {id:'INICIANDO NEGOCIOS', desc:'INICIANDO NEGOCIOS'},
      {id:'INICIANDO OFICIOS', desc:'INICIANDO OFICIOS'},
      {id:'MAXIGAS', desc:'MAXIGAS'},
      {id:'NEGOCIOS FAE MUJER', desc:'NEGOCIOS FAE MUJER'},
      {id:'PALABRA DE MUJER', desc:'PALABRA DE MUJER'}
    ]
  }
}

export function Boolean01(){
  return {
    selected:'TODO',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'SI', desc:'SI'},
      {id:'NO', desc:'NO'},
    ]
  }
}

export function TramoVenc01(){
  return {
    label:'Tramo Días Gestión',
    selected:'TODO',
    variable:'tdcr',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'0. 0 DÍAS', desc:'0. 0 DÍAS'},
      {id:'1. 1 a 2 DÍAS', desc:'1. 1 a 2 DÍAS'},
      {id:'2. 3 a 5 DÍAS', desc:'2. 3 a 5 DÍAS'},
      {id:'3. 6 a 10 DÍAS', desc:'3. 6 a 10 DÍAS'},
      {id:'4. 11 a 20 DÍAS', desc:'4. 11 a 20 DÍAS'},
      {id:'5. 21 a 30 DÍAS', desc:'5. 21 a 30 DÍAS'},
      {id:'6. MÁS DE 30 DÍAS', desc:'6. MÁS DE 30 DÍAS'},
      {id:'7. VACÍO', desc:'7. VACÍO'}
    ]
  }
}

export function Cargo01(){
  return {
    label:'',
    selected:'TODO',
    variable:'carg',
    data:[
      {id:0,desc:'Todo'},
      {id:1,desc:'Administradores'},
      {id:2,desc:'Coordinadores'}
    ]
  }
}
export function varProducto(){
  return {
    label:'Producto',
    selected:'TODOS',
    variable:'prod',
    data:[
      {id:'TODOS', desc:'Todos'},
      {id:'Ahorros', desc:'Ahorros'},
      {id:'Plazo Fijo', desc:'Plazo Fijo'},
      {id:'Cts', desc:'Cts'},
    ]
  }
}


export function VariableMontoMotivo(){
  return {
    label:'Variable Monto',
    selected:'Monto',
    variable:'tdcrMonto',
    data:[
      {id:'Monto', desc:'MONTO'},
      {id:'Ncredito', desc:'NUM.CREDITOS'}
    ]
  }
}

export function VariableNIngreso(){
  return {
    label:'Tipo',
    selected:'1',
    variable:'tipcuota',
    data:[
      {id:'1', desc:'Total'},
      {id:'2', desc:'Nuevo Ingreso'},
      {id:'3', desc:'Mantiene'}
    ]
  }
}

export function TIPOAgenteC(){
  return {
    label:'Tipo',
    selected:'TODOS',
    variable:'tip_age',
    data:[
      {id:'TODOS', desc:'TODOS'},
      {id:'1', desc:'Propio'},
      {id:'2', desc:'Satelital'}
    ]
  }
}

export function TipoVariable(){   
  return {  
    label:'Variable',
    selected:'Clientes',
    variable:'agru',
    data:[
      {id:'Clientes', desc:'Clientes'},
      {id:'Cuentas', desc:'Cuentas'},
      {id:'Saldo', desc:'Saldo'}
    ]
  }
}
export function TipoGrupo(){   
  return {  
    label:'Grupo',
    selected:'Nuevo',
    variable:'grupo',
    data:[
      {id:'Nuevo', desc:'Nuevos del Mes'},
      {id:'Anual', desc:'Nuevos Año'} 
    ]
  }
}

export function TipoTransaccion(){   
  return {  
    label:'Tipo',
    selected:'RETIRO',
    variable:'tipo',
    data:[
      {id:'RETIRO', desc:'Retiro'},
      {id:'OTRA TRX', desc:'Otras Trx'},
      {id:'PAGO OBLIG.', desc:'Pago Obligatorio'}
    ]
  }
}

export function VariableNIngresoD(){
  return {
    label:'Tipo',
    selected:'TODO',
    variable:'tipcuota',
    data:[
      {id:'TODO', desc:'TODO'},
      {id:'Nuevo', desc:'Nuevo Ingreso'},
      {id:'Mantiene', desc:'Mantiene'}
    ]
  }
}


export function VariableProductNIngreso(){
  return {
    label:'Producto',
    selected:'0',
    variable:'prod',
    data:[
      {id:'0', desc:'Todos'},
      {id:'1', desc:'AGROPECUARIO'},
      {id:'2', desc:'CONSTRUYENDO CONFIANZA'},
      //{id:'3', desc:'CREDITO EDUCATIVO'},
      {id:'4', desc:'EMPRENDIENDO CONFIANZA'},
      //{id:'5', desc:'INICIANDO CONFIANZA PYME'},
      {id:'6', desc:'PALABRA DE MUJER'},
      {id:'7', desc:'CONSUMO'},
      {id:'8', desc:'GARANTIA LIQUIDA'},
      {id:'9', desc:'TRABAJADORES FC'},
      //{id:'11', desc:'HIPOTECARIO'},
      {id:'12', desc:'INICIANDO CONFIANZA'},
      //{id:'13', desc:'MAXIGAS'},
      {id:'16', desc:'CREDITOS FAE'},
      {id:'17', desc:'CREDITOS REACTIVA'},
      //{id:'18', desc:'INICIANDO OFICIOS'},
      {id:'19', desc:'INICIANDO NEGOCIOS'},
      {id:'20', desc:'INCLUSION FAE MUJER'},
      {id:'21', desc:'NEGOCIOS FAE MUJER'}

    ]
  }
}






export function VariableStock(){
  return {
    label:'Variable Stock',
    selected:'Flujo',
    variable:'tdcrMoti',
    data:[
      {id:'Stock', desc:'STOCK'},
      {id:'Flujo', desc:'FLUJO'}
    ]
  }
}

export function Autonomia(){
  return {
    label:'Autonomia',
    selected:2,
    variable:'aut',
    data:[
      {id:2, desc:'TODO'},
      {id:1, desc:'CON AUTONOMÍA'},
      {id:0, desc:'SIN AUTONOMÍA'}
    ]
  }
}

export function Tipbase(){
  return {
    label:'Base',
    selected:'NUEVOS',
    variable:'base',
    data:[
      {id:'NUEVOS', desc:'Nuevos'},
      {id:'RECURRENTES', desc:'Recurrentes'},
      {id:'REENGANCHE', desc:'Reenganche'}
    ]
  }
}

export function Mostrar_por(){
  return {
    label:'Mostrar por',
    selected:0,
    variable:'ver',
    data:[
      {id:0, desc:'Operación'},
      {id:1, desc:'Saldo'}
    ]
  }
} 

export function Tipo_asesor(){
  return {
    label:'Tipo asesor',
    selected:0,
    variable:'tipo_ase',
    data:[
      {id:0, desc:'Todo'},
      {id:1, desc:'Asesor Operativo'},
      {id:2, desc:'Asesor virtual'}
    ]
  }
} 


