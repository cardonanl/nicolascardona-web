---
title: "Mapeando las salchipaperias en Cali: Scrapping aplicado"
date: "2024-03-26"
slug: "mapeando-las-salchipaperias-en-cali-scrapping-aplicado"
excerpt: "Con el estricto propósito de resolver mi duda existencial sobre si era posible extraer los datos de Google Maps, preparé este proyecto."
---

Con el estricto propósito de resolver mi duda interna y existencial sobre si era o no posible extraer los datos de Google Maps decidí preparar este corto proyecto que, a la final, puede tener múltiples aplicaciones desde los estudios de mercado hasta las decisiones en materia de política pública (en GM, por ejemplo, se incluyen negocios y ubicaciones informales).

Entonces, ¿qué se debe hacer para descargar/minar/scrapear la información que se observa cuando se realiza una búsqueda de Google Maps? Dos pasos esenciales:

- Generar una llave/key de la API de Google Places API.
- Usar esta llave en algún lenguaje que tenga la posibilidad de contactarse a la API en cuestión.

Para quienes no están familiarizados con algunos términos, básicamente lo que se hace es aprovechar una puerta pública de acceso a los servidores de GM para interactuar con ella. En otros proyectos donde estas APIs no existen, normalmente se prepara un código que entra al código fuente de una página y extrae la info como lo haría un humano al copiar y pegar. Este no es el caso.

Respecto a la generación de la API, cualquier persona con una cuenta Gmail lo puede hacer. Acá dejo una guía vinculada a otro proyecto con la diferencia de que en vez de habilitar la api de Google Places, se usó la de Youtube DATA V3, pero es lo mismo, todo está en la misma sección: [Web-Scrapping-para-Youtube](https://github.com/cardonanl/Web-Scrapping-para-Youtube)

Teniendo la API, que normalmente se ve como algo del estilo `BakaSyLKSxPqFEOZlpX7DFYDL3Wc-r-0Uv8vIOB9`, procedemos al código. Normalmente estos proyectos los trabajo en Python o R (los únicos lenguajes con los que estoy familiarizado) y en este caso todo está estructurado en Python. ¿Cuál es mi recomendación? Copiar y pegar en un Google Collab, en alguna plataforma del tipo Replit o ya en su entorno de preferencia. Para las personas que NO están familiarizadas con este tema, lo mejor es Google Collab.

El código tiene varias indicaciones que acá no se leen bien pero al trasladarlo al editor van a sobresalir. De cualquier manera lo importante es:

- Tal y como está el código en este momento no se necesita ningún cambio si el propósito es tener una base de datos de resultados.
- Lo único que hay que cambiar es la API donde dice `key_usuario` y la entrada de la búsqueda (el ejemplo fue `'Salchiapapas en Cali'`).
- Para otras ciudades, hay que cambiar las coordenadas.
- Así las coordenadas estén en la ciudad, toda búsqueda debe incluir el "en Tal Lado". Esto debido a que de lo contrario la base de datos va a quedar sucia con lugares de otros municipios (digamos Palmira o Popayán para el caso de Cali).
- El archivo que se genera es un `.csv` que se me hace fácil de manejar en estas dimensiones.
- La API tiene una cantidad máxima de request al día, son al rededor de 6000.

En resumen, ¿qué hace el código?

- Crea una función que, a partir de un término de búsqueda, una coordenada y un radio alrededor de esa coordinada, se conecta a la API para solicitar la información y los va guardando en una lista de diccionarios.
- El código tiene un pequeño truco y es que intenta abordar todas las páginas posibles de resultados que pueda devolver la API.

Acá el código:

```python
import googlemaps
import pandas as pd
import time

# Configura clave API de PLACES API
gmaps = googlemaps.Client(key='key_usuario')

# Funcion basica para extraer datos usando un query
def obtener_resultados_paginados(query, location, radius):
    negocios = []
    resultados = gmaps.places(query=query, location=location, radius=radius)

    while True:
        # Agrega los resultados actuales
        negocios += [{
            'Nombre': lugar.get('name'),
            'Dirección': lugar.get('formatted_address'),
            'Latitud': lugar.get('geometry', {}).get('location', {}).get('lat'),
            'Longitud': lugar.get('geometry', {}).get('location', {}).get('lng'),
            'Calificación': lugar.get('rating')
        } for lugar in resultados.get('results', [])]

        # Verifica si hay un token de paginación para más resultados
        page_token = resultados.get('next_page_token')
        if page_token:
            time.sleep(2)
            resultados = gmaps.places(page_token=page_token)
        else:
            break

    return pd.DataFrame(negocios)

# Ejecución
# La búsqueda debe incluir el "en Cali"
# Las coordenadas son las del centro de Cali y el radio está en metros (máximo 50.000)
df_salchiapapas = obtener_resultados_paginados(
    f'{termino_busqueda_1} en Cali', (3.451647, -76.531985), 5000
)
df_salchipaperias = obtener_resultados_paginados(
    f'{termino_busqueda_2} en Cali', (3.451647, -76.531985), 5000
)

# Unifica los DataFrames y eliminar duplicados
df_unificado = pd.concat([df_salchiapapas, df_salchipaperias], ignore_index=True)
df_sin_duplicados = df_unificado.drop_duplicates(subset=['Nombre'], keep='first')

print(df_sin_duplicados)
```

Posteriormente decidí hacer un mapa para ubicar cada punto. Dejo dos ejemplos:

**Mapa interactivo en HTML** (se puede insertar en una página web y el usuario puede clickear en cada ubicación):

```python
import folium

# Crea un mapa centrado en Cali
mapa_cali = folium.Map(location=[3.451647, -76.531985], zoom_start=13)

# Añade marcadores para cada negocio en el DataFrame
for indice, fila in df_sin_duplicados.iterrows():
    folium.Marker(
        location=[fila['Latitud'], fila['Longitud']],
        popup=f"{fila['Nombre']}: {fila['Dirección']}",
        tooltip=fila['Nombre']
    ).add_to(mapa_cali)

# Guarda el mapa en un archivo HTML
mapa_cali.save('mapa_negocios_cali.html')
```

**Mapa estático de alta resolución** con GeoPandas y contextily:

```python
import geopandas as gpd
import matplotlib.pyplot as plt
import contextily as ctx

# GeoDataFrame
gdf = gpd.GeoDataFrame(
    df_sin_duplicados,
    geometry=gpd.points_from_xy(df_sin_duplicados.Longitud, df_sin_duplicados.Latitud)
)
gdf.crs = "EPSG:4326"
gdf = gdf.to_crs(epsg=3857)

fig, ax = plt.subplots(figsize=(15, 15))

# Agregar los puntos al mapa con estilo personalizado
gdf.plot(ax=ax, color='red', markersize=70, edgecolor='black')

# Mapa base
ctx.add_basemap(ax, source=ctx.providers.Esri.WorldStreetMap)

# Límites del mapa con margen del 15%
x_min, y_min, x_max, y_max = gdf.total_bounds
x_range = (x_max - x_min) * 0.15
y_range = (y_max - y_min) * 0.15

ax.set_xlim(x_min - x_range, x_max + x_range)
ax.set_ylim(y_min - y_range, y_max + y_range)

ax.text(
    x_min - x_range, y_max + y_range,
    'Ubicación de salchipaperias oficiales en Cali',
    fontsize=14, ha='left', va='bottom', color='black', weight='bold'
)
```

---

*Contacto: Twitter [@cardonanl](https://twitter.com/cardonanl)*
