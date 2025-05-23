import React from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";

const Legal = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Barra de presentación superior */}
      <section className="bg-blue-600 text-white p-3">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <Link to="/vende-tu-piso" className="hover:underline">Vende tu piso</Link>
            <Link to="/oficinas" className="ml-6 hover:underline">Oficinas</Link>
            <Link to="/valoracion" className="ml-6 hover:underline">Valora tu casa</Link>
            <Link to="/alquiler-vacacional" className="ml-6 hover:underline">Alquiler Vacacional</Link>
          </div>
          <div>
            <Link to="/contacto" className="ml-6 hover:underline">Contacto</Link>
            <Link to="/trabaja-con-nosotros" className="ml-6 hover:underline">Trabaja con nosotros</Link>
            <Link to="/franquicia" className="ml-6 hover:underline">Abre tu franquicia</Link>
          </div>
        </div>
      </section>

      {/* Barra de navegación */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md" style={{ height: '90px' }}>
        <div className="flex items-center space-x-3 ml-6" onClick={navigateToHome}>
          <Link to="/">
            <img src="/sinFondo.png" alt="Logo" className="w-28 h-auto" />
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Aviso Legal</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Información legal sobre Vivius Inmobiliaria, uso del sitio web y protección de datos personales.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto p-6 my-12 bg-white shadow-md rounded-lg">
        {/* Identificación */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">1. Información General</h2>
          <p className="text-gray-700 mb-4">
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li>La empresa titular de este sitio web es <strong>Vivius Inmobiliaria, S.L.</strong></li>
            <li>CIF: B12345678</li>
            <li>Domicilio social: Calle Ejemplo, 123, 28001 Madrid</li>
            <li>Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Hoja M-123456</li>
            <li>Email de contacto: info@vivius.es</li>
            <li>Teléfono: 910 123 456</li>
          </ul>
        </section>
        
        {/* Términos de uso */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">2. Términos y Condiciones de Uso</h2>
          <p className="text-gray-700 mb-4">
            El acceso y uso de este sitio web está sujeto a los presentes términos y condiciones de uso y todas las leyes y regulaciones aplicables. El acceso a este sitio web y su uso implica la aceptación de estos términos y condiciones sin reservas.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1. Uso del sitio</h3>
          <p className="text-gray-700 mb-4">
            Vivius Inmobiliaria autoriza la visualización, impresión y descarga parcial del contenido de este sitio web, única y exclusivamente si concurren las siguientes condiciones:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li>Que sea compatible con los fines de este sitio web.</li>
            <li>Que se realice con el exclusivo ánimo de obtener la información contenida para uso personal y privado. Se prohíbe expresamente su utilización con fines comerciales o para su distribución, transformación o comunicación.</li>
            <li>Que ninguno de los contenidos del sitio web sean modificados de manera alguna.</li>
            <li>Que ningún gráfico, icono o imagen disponible en este sitio web sea utilizado, copiado o distribuido separadamente del texto o resto de imágenes que lo acompañan.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2. Contenido y disponibilidad</h3>
          <p className="text-gray-700 mb-4">
            Vivius Inmobiliaria no garantiza que los contenidos del sitio web sean precisos, completos o actualizados. La información de las propiedades inmobiliarias es orientativa y no constituye una oferta vinculante. Los precios, características y disponibilidad de los inmuebles pueden variar sin previo aviso.
          </p>
          <p className="text-gray-700 mb-4">
            Vivius Inmobiliaria se reserva el derecho a realizar cambios en el sitio web, en sus políticas y en sus condiciones de servicio en cualquier momento y sin previo aviso.
          </p>
        </section>
        
        {/* Propiedad intelectual */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">3. Propiedad Intelectual e Industrial</h2>
          <p className="text-gray-700 mb-4">
            Todos los contenidos del sitio web, incluyendo sin limitación textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Vivius Inmobiliaria o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual.
          </p>
          <p className="text-gray-700 mb-4">
            Las marcas, nombres comerciales o signos distintivos son titularidad de Vivius Inmobiliaria o terceros, sin que pueda entenderse que el acceso al sitio web atribuya algún derecho sobre las citadas marcas, nombres comerciales y/o signos distintivos.
          </p>
        </section>
        
        {/* Política de privacidad */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">4. Política de Privacidad</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1. Responsable del tratamiento</h3>
          <p className="text-gray-700 mb-4">
            El responsable del tratamiento de sus datos personales es Vivius Inmobiliaria, S.L., con CIF B12345678 y domicilio social en Calle Ejemplo, 123, 28001 Madrid.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2. Finalidad del tratamiento</h3>
          <p className="text-gray-700 mb-4">
            Tratamos la información que nos facilitan las personas interesadas con las siguientes finalidades:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li>Gestionar las solicitudes de información sobre inmuebles y servicios.</li>
            <li>Atender consultas y solicitudes de contacto.</li>
            <li>Enviar comunicaciones relacionadas con nuestros servicios y propiedades en caso de que el usuario haya dado su consentimiento.</li>
            <li>Elaborar perfiles con fines comerciales para ofrecer propiedades que puedan ser de interés para el usuario, siempre que este haya dado su consentimiento.</li>
            <li>Cumplir con obligaciones legales aplicables a nuestra actividad.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3. Legitimación del tratamiento</h3>
          <p className="text-gray-700 mb-4">
            La base legal para el tratamiento de sus datos es:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li>El consentimiento del interesado prestado mediante la aceptación expresa de nuestra política de privacidad.</li>
            <li>La ejecución de un contrato en el que el interesado es parte o para la aplicación de medidas precontractuales.</li>
            <li>El interés legítimo de Vivius Inmobiliaria para atender las solicitudes y mejorar nuestros servicios.</li>
            <li>El cumplimiento de obligaciones legales aplicables.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.4. Derechos de los interesados</h3>
          <p className="text-gray-700 mb-4">
            Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando datos personales que les conciernan. Las personas interesadas tienen derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.
          </p>
          <p className="text-gray-700 mb-4">
            En determinadas circunstancias, los interesados podrán solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones. También, en determinadas circunstancias y por motivos relacionados con su situación particular, los interesados podrán oponerse al tratamiento de sus datos. Vivius Inmobiliaria dejará de tratar los datos, salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones.
          </p>
          <p className="text-gray-700 mb-4">
            Para ejercer estos derechos, puede dirigirse a nosotros a través del correo electrónico: privacidad@vivius.es o por correo postal a la dirección indicada, adjuntando copia de su DNI o documento identificativo equivalente.
          </p>
        </section>
        
        {/* Política de cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">5. Política de Cookies</h2>
          <p className="text-gray-700 mb-4">
            Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del usuario, realizar análisis de navegación de los usuarios y mostrar contenido y publicidad relacionada con sus preferencias.
          </p>
          <p className="text-gray-700 mb-4">
            Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información. Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información obtenida, se pueden utilizar para reconocer al usuario y mejorar el servicio ofrecido.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1. Tipos de cookies utilizadas</h3>
          <p className="text-gray-700 mb-4">
            Este sitio web utiliza los siguientes tipos de cookies:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.</li>
            <li><strong>Cookies de análisis:</strong> Son aquellas que permiten el seguimiento y análisis del comportamiento de los usuarios del sitio web para la elaboración de perfiles de navegación, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.</li>
            <li><strong>Cookies de personalización:</strong> Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serían el idioma, el tipo de navegador, etc.</li>
            <li><strong>Cookies publicitarias:</strong> Son aquellas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2. Cómo deshabilitar las cookies</h3>
          <p className="text-gray-700 mb-4">
            Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador.
          </p>
          <p className="text-gray-700 mb-4">
            A continuación, le ofrecemos enlaces donde encontrará información sobre cómo gestionar las cookies en los navegadores más utilizados:
          </p>
          <ul className="text-gray-700 mb-4 list-disc pl-5 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" className="text-blue-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-600 hover:underline">Internet Explorer</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline">Safari</a></li>
          </ul>
        </section>
        
        {/* Enlaces */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">6. Enlaces a Terceros</h2>
          <p className="text-gray-700 mb-4">
            Este sitio web puede incluir enlaces a sitios web de terceros. Vivius Inmobiliaria no asume ninguna responsabilidad respecto a la información contenida en sitios web de terceros y las políticas de privacidad que en ellos se apliquen. Por esta razón, recomendamos a los usuarios que consulten las políticas de privacidad y los avisos legales de todos los sitios web a los que accedan a través de enlaces desde nuestro sitio web.
          </p>
        </section>
        
        {/* Modificaciones */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">7. Modificación del Aviso Legal</h2>
          <p className="text-gray-700 mb-4">
            Vivius Inmobiliaria se reserva el derecho a modificar el presente aviso legal para adaptarlo a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.
          </p>
        </section>
        
        {/* Legislación aplicable */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">8. Legislación Aplicable y Jurisdicción</h2>
          <p className="text-gray-700 mb-4">
            El presente aviso legal se rige por la legislación española. Para cualquier controversia que pudiera surgir en relación con el sitio web y/o sus servicios, las partes se someten a los juzgados y tribunales de la ciudad de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
          </p>
          <p className="text-gray-700">
            Última actualización: 1 de julio de 2023
          </p>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-blue-600 text-white py-4">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/legal" className="hover:text-yellow-300">Aviso Legal</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300">Conócenos</Link></li>
          <li><Link to="/contacto" className="hover:text-yellow-300">Contacto</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Legal; 