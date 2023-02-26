import './index.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function App() {
  //유저 리스트
  const [users, setUsers] = useState([]);
  //업데이트 목록
  const [beUpdatedId, setBeUpdatedId] = useState('');
  const [beUpdatetitle, setBeUpdatetitle] = useState('');
  const [beUpdatecontent, setBeUpdatecontent] = useState('');
  // 업데이트 모달창 on off
  const [upModal, setUpModal] = useState(false);
  // 생성창 이름 입력칸
  const updatetitleEl = useRef(null);
  // 생성 변수
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  // 생성 모달창 on off
  const [createModal, setcreateModal] = useState(false);
  // 생성창 이름 입력칸
  const createtitleEl = useRef(null);
  // 생성창 띄우기 버튼
  const forFucusingCreate = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown',e => {
      if(e.key === 'Escape'){
        setUpModal(false);
        setcreateModal(false);
      }
    })
    myFunction();
  }, []);
  useEffect(() => {
    if(createModal){
      createtitleEl.current.focus();
    }else{
      forFucusingCreate.current.focus();
    }
  }, [createModal]);
  useEffect(() => {
    if(upModal){
      updatetitleEl.current.focus();
    }
  }, [upModal]);

  function myFunction() {
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        console.log(res);
        setUsers((prev) => {
          return [...res.data];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const updateSetting = (el) => {
    setBeUpdatedId(el.id);
    setBeUpdatetitle(el.title);
    setBeUpdatecontent(el.content);
    setUpModal(true);
  };

  return (
    <main className='bg-indigo-100 h-[100vh]'>
    <div className='p-8 text-sm max-w-md mx-auto'>
      {createModal && (
        <div
        className="fixed bg-black bg-opacity-70 w-full h-full left-0 top-0 z-10 flex items-center justify-center">
          <form
            className="bg-white rounded-xl p-4 space-y-2"
            onSubmit={(e) => {
              axios
                .post('http://localhost:3001/users_create', {
                  title: e.target.title.value,
                  content: e.target.content.value,
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <div>
              <input
                ref={createtitleEl}
                type="text"
                name="title"
                className="rounded-lg bg-slate-300 px-1"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                name="content"
                className="rounded-lg bg-slate-300 px-1"
                value={content}
                onChange={(e) => {
                  setcontent(e.target.value);
                }}
              />
            </div>
            <div className="grid-cols-2 gap-1 grid">
              <button className="bg-indigo-500 rounded-lg text-white hover:bg-indigo-700 h-10">
                CREATE
              </button>
              <button
                type="button"
                onClick={() => {
                  setcreateModal(false);
                }}
                className="bg-red-500 rounded-lg text-white hover:bg-red-700 h-10"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      <table className="w-full rounded-t overflow-hidden">
        <thead className='bg-indigo-400 text-white uppercase font-light border border-solid border-indigo-500'>
          <tr>
            <th></th>
            <th>title</th>
            <th>content</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          {users.map((el, idx) => (
              <tr key={idx}>
                <td className="border border-solid border-slate-600 p-1 text-center">
                  {el.id}
                </td>
                <td
                  onClick={() => updateSetting(el)}
                  className="border border-solid border-slate-600 p-1 cursor-pointer"
                >
                  {el.title}
                </td>
                <td
                  onClick={() => updateSetting(el)}
                  className="border border-solid border-slate-600 p-1 cursor-pointer"
                >
                  {el.content}
                </td>
                <td className="border border-solid border-slate-600 p-1 text-center">
                  <button
                    className="bg-red-500 rounded-lg text-white hover:bg-red-700 h-5 px-2"

                    onClick={() => {
                      axios
                        .post('http://localhost:3001/users_delete', {
                          id: el.id,
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                        .then(myFunction());
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <ul className='flex justify-end mt-4'>
        <li>
          <button
          ref={forFucusingCreate}
            onClick={() => {setcreateModal(true)}}
            className="w-28 bg-indigo-500 rounded-lg text-white hover:bg-indigo-700 h-10"
          >
            CREATE
          </button>
        </li>
      </ul>
      {upModal && (
        <div className="fixed bg-black bg-opacity-70 w-full h-full left-0 top-0 z-10 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 space-y-2">
            <div>
              <input
              ref={updatetitleEl}
                type="text"
                className="rounded-lg bg-slate-300 px-1"
                value={beUpdatetitle}
                name="title"
                onChange={(e) => {
                  setBeUpdatetitle(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                className="rounded-lg bg-slate-300 px-1"
                value={beUpdatecontent}
                name="content"
                onChange={(e) => {
                  setBeUpdatecontent(e.target.value);
                  console.log('뭐야이게 ㅜㅜ');
                }}
              />
            </div>
            <div className="grid-cols-2 gap-1 grid">
              <button
                className="bg-indigo-500 rounded-lg text-white hover:bg-indigo-700 h-10"
                onClick={() => {
                  axios
                    .post('http://localhost:3001/users_update', {
                      id: beUpdatedId,
                      title: beUpdatetitle,
                      content: beUpdatecontent,
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .then(myFunction());
                    setUpModal(false);
                }}
              >
                UPDATE
              </button>
              <button
                onClick={() => {
                  setUpModal(false);
                }}
                className="bg-red-500 rounded-lg text-white hover:bg-red-700 h-10"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
  );
}

export default App;
