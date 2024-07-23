# Document Studies

A tool for running studies involving documents.


## Quicklinks & Demos

- [Publication](https://aclanthology.org/2024.naacl-demo.9.pdf)
- A [URL demo](http://ec2-54-176-63-134.us-west-1.compute.amazonaws.com/studies/?study_id=2d43e045-4420-46b2-9c2f-4e0c379e4f4c) of the annotator interface
- An overall [demo video](https://drive.google.com/file/d/1G5sof7Oy3KCFvoZEep54q7_o0kWOiiRh/view?usp=sharing)


## Getting Started

You will need to have:

- A Unix-like operating system.
- Postgresql
- Ruby 3
- Node 18+

From there, you can download this repository and run:

```sh
bundle install
ADOBE_PRODUCTION_PASSWORD=test123 ./bin/rails db:setup
npm install
```

After that, open two terminal windows. In one terminal window, run:

```sh
./bin/rails s
```

In another terminal window, run:

```sh
npm start
```

You should then be able to navigate to `http://localhost:3000` and see all changes reflected with live reloading.

Alternatively, if you have `foreman` installed, you can run:

```sh
foreman start -f Procfile.dev
```

To get things going.

## Playing with the App

First, visit `http://localhost:3000/admins` and log in with:

```
username: test@test.com
password: test123
```

From there, you can upload a study JSON and the documents associated with it as necessary.

## Citation

If you use Atlas, please cite the following:

```bibtex
@inproceedings{siu2024atlas,
  title={ATLAS: A System for PDF-centric Human Interaction Data Collection},
  author={Siu, Alexa and Wang, Zichao and Hoeflich, Joshua and Kapasi, Naman and Nenkova, Ani and Sun, Tong},
  booktitle={Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (Volume 3: System Demonstrations)},
  pages={87--96},
  year={2024}
}
```
