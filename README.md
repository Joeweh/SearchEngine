# Patent Search Engine
Link to demo:
https://drive.google.com/drive/folders/1IN-gl4nKaU5cz7OlejdBKPCn_W_eXa_Q?usp=sharing

### Problem Statement
The specific problem I chose to solve is the efficient search and 
retrieval of relevant patent information from the provided collection of patent 
documents. My goal was to build a scalable and user-friendly search engine that 
can quickly query vast amounts of patent data concurrently, enabling users to 
filter for specific patents based on criteria like their title, document number, classification, 
or contents with ease and accuracy.

### Addressing the Problem Statement
The backend code implements a scalable search engine via Flask that preprocesses the provided 
patent documents into an indexed sqlite database optimized for fast lookups. 
This design allows for many searches to be processed in parallel, ensuring
fast response times even under heavy search loads. The search logic supports 
a wide variety of filtering criteria including title, document number, classification, 
and full-text content—so users can refine results with precision. By combining 
efficient indexing, parallel processing, and flexible search filters the 
system ensures that even large datasets can be queried quickly and accurately 
to deliver a responsive and user-friendly experience.

I decided to complete the "Interfaces and users" enhancement by creating a front end 
in React to make querying easy without requiring users to interact directly with the 
underlying data exchange process.

### How To Run
Install python 3.6+ & node package manager (npm)

Fill database
```bash
cd ./backend

python data_converter.py
```

Run Flask API
```bash
python server.py
```

Run React Project
```bash
npm install
npm run dev
```

### Notes
I handled the case of an empty detailed description
for a patent by displaying "No description" instead
of empty content. You can test this by searching for
"reinforced fabric" by title
