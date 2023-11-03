import { Document, Page,PDFViewer,View,Font,StyleSheet } from '@react-pdf/renderer';
import Crinformation from '../sr/cr_information';
import Header from '../sr/header';
import Sinformation from '../sr/s_information';
import Pinformation from '../sr/p_information';
import Noteform from '../sr/note_form';
import Signature from '../sr/signature';

Font.register({
    family: 'Ubuntu',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Ubuntu",
    },
  });


const PdfTemplatesr = ({data}) =>(
  <Document>
      <Page style={styles.page}>
          <Header data={data}/>
          <Crinformation data={data}/>
          <Sinformation data={data}/>
          <Pinformation data={data}/>
          <Noteform data={data}/>
          {/* <View style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
          }}>
          </View> */}
      </Page>
      <Page style={styles.page}>
        <Signature data={data} />
      </Page>
  </Document>
)

export default PdfTemplatesr;