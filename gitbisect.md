we used this to check the voice input (only works from ssl) on android.

connected phone with usb

allowed development mode by multiple times clicking on build number in settings

allowed usb debugging

then connected with chrome:

chrome://inspect/#devices



and used git bisect:

```
Microsoft Windows [Version 10.0.22621.608]
(c) Microsoft Corporation. Alle Rechte vorbehalten.
C:\Users\admin>mkdir delme2
C:\Users\admin>cd delme2
C:\Users\admin\delme2>git clone ..\mintrobi
Cloning into 'mintrobi'...
done.
C:\Users\admin\delme2>cd mintrobi
C:\Users\admin\delme2\mintrobi>git log
commit 6eba6077976b4905bbcf62402ca048c7309a2c07 (HEAD -> master, origin/master, origin/HEAD)
Author: ...
Date:   Fri Oct 7 10:22:35 2022 +0200

    set to 0.3%
...
...
...

commit 530cd25cb133f4f44f8f6927b019853e67e318df
Author: ...we used this to check the voice input (only works from ssl) on android.

connected phone with usb

allowed development mode by multiple times clicking on build number in settings

allowed usb debugging

then connected with chrome:

chrome://inspect/#devices



and used git bisect:

```
Microsoft Windows [Version 10.0.22621.608]
(c) Microsoft Corporation. Alle Rechte vorbehalten.
C:\Users\admin>mkdir delme2
C:\Users\admin>cd delme2
C:\Users\admin\delme2>git clone ..\mintrobi
Cloning into 'mintrobi'...
done.
C:\Users\admin\delme2>cd mintrobi
C:\Users\admin\delme2\mintrobi>git log
commit 6eba6077976b4905bbcf62402ca048c7309a2c07 (HEAD -> master, origin/master, origin/HEAD)
Author: ...
Date:   Fri Oct 7 10:22:35 2022 +0200

    set to 0.3%
...
...
...

commit 530cd25cb133f4f44f8f6927b019853e67e318df
Author: ...
Date:   Fri Sep 30 10:26:37 2022 +0200

    added speech recognition and synthesis



C:\Users\admin\delme2\mintrobi>git bisect start

C:\Users\admin\delme2\mintrobi>git bisect bad

C:\Users\admin\delme2\mintrobi>git checkout 530cd25cb133f4f44f8f6927b019853e67e318df
Note: switching to '530cd25cb133f4f44f8f6927b019853e67e318df'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 530cd25 added speech recognition and synthesis

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 22 revisions left to test after this (roughly 5 steps)
[ffe194a1608813d3434579b5a904d175cfbd2309] box and electromagnet working missing metal box, hole and the picture exchange with scientist

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 11 revisions left to test after this (roughly 4 steps)
[fcf9e160bd9f9f66e124ee528340b861a803f9c7] KaiKai corrected

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[e743f433a55797acd1d15222805ae7af931b0f56] added continues recognition

C:\Users\admin\delme2\mintrobi>git bisect bad
Bisecting: 2 revisions left to test after this (roughly 2 steps)
[43575d014736303fab6781a3b08be5cb275ef7da] improved handling of voice

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 0 revisions left to test after this (roughly 1 step)
[9d0063bf594d51c2bb87e9fc21fd2704e6bf47cb] improved stop

C:\Users\admin\delme2\mintrobi>git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[cbe35f2e88aab96c95a09c36cb19cd6272ef92d8] now you can shout stop between the sentences

C:\Users\admin\delme2\mintrobi>git bisect bad
cbe35f2e88aab96c95a09c36cb19cd6272ef92d8 is the first bad commit
commit cbe35f2e88aab96c95a09c36cb19cd6272ef92d8
Author: ...
Date:   Thu Oct 6 10:52:40 2022 +0200

    now you can shout stop between the sentences

 index.html | 42 +++++++++++++++++++++++++++++++++++++++---
 1 file changed, 39 insertions(+), 3 deletions(-)



```


Date:   Fri Sep 30 10:26:37 2022 +0200

    added speech recognition and synthesis



C:\Users\admin\delme2\mintrobi>git bisect start

C:\Users\admin\delme2\mintrobi>git bisect bad

C:\Users\admin\delme2\mintrobi>git checkout 530cd25cb133f4f44f8f6927b019853e67e318df
Note: switching to '530cd25cb133f4f44f8f6927b019853e67e318df'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 530cd25 added speech recognition and synthesis

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 22 revisions left to test after this (roughly 5 steps)
[ffe194a1608813d3434579b5a904d175cfbd2309] box and electromagnet working missing metal box, hole and the picture exchange with scientist

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 11 revisions left to test after this (roughly 4 steps)
[fcf9e160bd9f9f66e124ee528340b861a803f9c7] KaiKai corrected

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[e743f433a55797acd1d15222805ae7af931b0f56] added continues recognition

C:\Users\admin\delme2\mintrobi>git bisect bad
Bisecting: 2 revisions left to test after this (roughly 2 steps)
[43575d014736303fab6781a3b08be5cb275ef7da] improved handling of voice

C:\Users\admin\delme2\mintrobi>git bisect good
Bisecting: 0 revisions left to test after this (roughly 1 step)
[9d0063bf594d51c2bb87e9fc21fd2704e6bf47cb] improved stop

C:\Users\admin\delme2\mintrobi>git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[cbe35f2e88aab96c95a09c36cb19cd6272ef92d8] now you can shout stop between the sentences

C:\Users\admin\delme2\mintrobi>git bisect bad
cbe35f2e88aab96c95a09c36cb19cd6272ef92d8 is the first bad commit
commit cbe35f2e88aab96c95a09c36cb19cd6272ef92d8
Author: ...
Date:   Thu Oct 6 10:52:40 2022 +0200

    now you can shout stop between the sentences

 index.html | 42 +++++++++++++++++++++++++++++++++++++++---
 1 file changed, 39 insertions(+), 3 deletions(-)



```

