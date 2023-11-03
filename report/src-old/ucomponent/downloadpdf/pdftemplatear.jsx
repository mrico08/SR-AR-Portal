import { Document, Page,PDFViewer,View,Font,StyleSheet } from '@react-pdf/renderer';
import Crinformation from './ar/cr_information';
import Header from './ar/header';
import Sinformation from './ar/s_information';
import Pinformation from './ar/p_information';
import Noteform from './ar/note_form';
import Signature from './ar/signature';

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


const PdfTemplatear = ({data}) =>(
    <PDFViewer width="100%" height={932}>
        <Document>
            <Page style={styles.page}>
                <Header data={data} />
                <Crinformation data={data} />
                <Sinformation data={data} />
                <Pinformation data={data} />
                <Noteform  data={data} />
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
    </PDFViewer>
)

export default PdfTemplatear;