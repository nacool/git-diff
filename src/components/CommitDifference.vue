<template>
  <div class="container">
    <div id="divcommitinfo" class="row mb-5">
      <div class="col-sm-1">
        <img class="avatar" src="../assets/avatar.svg" />
      </div>
      <div class="col-sm-6">
        <span class="heading">{{ commitInfo.message }} </span> <br />
        <span class="author">Authored by</span
        ><span class="authorname">{{ commitInfo.author.name }}</span
        ><span class="author">{{convertDate(commitInfo.author.date)}}</span><br />
        <span class="description"
          >This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Eget ipsum <br />
          massa egestas id pellentesque volutpat maecenas amet.</span
        >
      </div>
      <div class="col-sm-5 commitedby" style="padding-right:0px">
        <p v-if="commitInfo.author.name !== commitInfo.committer.name">
          <span class="author">Commited by </span
          ><span class="authorname"> {{ commitInfo.committer.name }} </span>
          <span class="author"> {{convertDate(commitInfo.committer.date)}}</span>
        </p>
        <p>
          <span class="author"> Commit </span>
          <span class="authorname"> {{ commitInfo.oid }}</span>
        </p>
        <p>
          <span class="author">Parent </span>
          <span
            class="parentcommitid"
            v-for="parent in commitInfo.parents"
            :key="parent.oid"
            >{{ parent.oid }}</span
          >
        </p>
      </div>
    </div>

    <div
      id="divcommitdiff"
      v-for="commit in commitDifferences"
      :key="commit.headFile.path"
      class="toppadding row"
    >
      <p>
        <img
          @click="isExpand = !isExpand"
          class="groupicon"
          src="../assets/groupicon.svg"
          alt=""
        />
        <span class="filename">{{ commit.headFile.path }}</span>
      </p>
      <div
        :style="isExpand ? 'display:block' : 'display:none'"
        v-for="hunk in commit.hunks"
        :key="hunk.header"
        class="col-md-12 codelines"
      >
        <p class="numberrangeinfo">{{ hunk.header }}</p>
        <table class="toppadding table table-borderless codedifftable">
          <tbody>
            <tr v-for="(line, index) in hunk.lines" :key="line.baseLineNumber">
              <template
                v-if="
                  index + 1 != hunk.lines.length
                    ? line.baseLineNumber ==
                      hunk.lines[index + 1].headLineNumber
                    : false
                "
              >
                <td class="redbg tdlinenumber">
                  {{ line.baseLineNumber }}
                </td>
                <td class="redbg"></td>
                <td class="redbg tdcontent">-</td>
                <td class="redbg tdcontent">
                  {{ line.content }}
                </td>
              </template>
              <template v-else-if="line.baseLineNumber == line.headLineNumber">
                <td class="tdlinenumber">
                  {{ line.baseLineNumber }}
                </td>
                <td class="tdlinenumber">
                  {{ line.headLineNumber }}
                </td>
                <td></td>
                <td class="tdcontent">
                  {{ line.content }}
                </td>
              </template>
              <template v-else>
                <td class="greenbg"></td>
                <td class="greenbg tdlinenumber">
                  {{ line.headLineNumber }}
                </td>

                <td class="greenbg tdcontent">+</td>
                <td class="greenbg tdcontent">
                  {{ line.content }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  name: "CommitDifference",
  props:{owner:String, repository:String, commitSHA:String},
  data() {
    return {
      commitInfo: Object,
      commitDifferences: [],
      isExpand: true,
    };
  },
  methods:{

    convertDate(date){

      return timeAgo.format( Date.parse(date) - 24 * 60 * 60 * 1000)

    }

  },
  created() {
    this.commitInfo = {
      oid: "a1bf367b3af680b1182cc52bb77ba095764a11f9",
      message:
        "repo-updater: Use config value repoListUpdateInterval (#14983)\n\nThis value was previously used to specify how frequently we would sync\r\nwith code hosts so it makes sense to reuse it to set a lower bound on\r\nhow often we sync now that we have backoff logic.",
      author: {
        name: "Ryan Slade",
        date: "2020-10-22T16:45:31+02:00",
        email: "ryanslade@gmail.com",
      },
      committer: {
        name: "GitHub",
        date: "2020-10-22T16:45:31+02:00",
        email: "noreply@github.com",
      },
      parents: [
        {
          oid: "89600bf602242ef66a741589b5bf784e378e5ead",
        },
      ],
    };

    this.commitDifferences = [
      {
        changeKind: "MODIFIED",
        headFile: {
          path: "cmd/repo-updater/repos/syncer.go",
        },
        baseFile: {
          path: "cmd/repo-updater/repos/syncer.go",
        },
        hunks: [
          {
            header: "@@ -63,7 +63,7 @@ type Syncer struct {",
            lines: [
              {
                baseLineNumber: 63,
                headLineNumber: 63,
                content: " type RunOptions struct {",
              },
              {
                baseLineNumber: 64,
                headLineNumber: 64,
                content:
                  " \tEnqueueInterval func() time.Duration // Defaults to 1 minute",
              },
              {
                baseLineNumber: 65,
                headLineNumber: 65,
                content:
                  " \tIsCloud         bool                 // Defaults to false",
              },
              {
                baseLineNumber: 69,
                headLineNumber: 68,
                content: " }",
              },
              {
                baseLineNumber: 70,
                headLineNumber: 69,
                content: " ",
              },
            ],
          },
          {
            header:
              "@@ -134,7 +134,7 @@ func (s *syncHandler) Handle(ctx context.Context, tx dbworkerstore.Store, record",
            lines: [
              {
                baseLineNumber: 134,
                headLineNumber: 134,
                content: " \t\tstore = ws.With(tx.Handle().DB())",
              },
              {
                baseLineNumber: 135,
                headLineNumber: 135,
                content: " \t}",
              },
              {
                baseLineNumber: 136,
                headLineNumber: 136,
                content: " ",
              },
              {
                baseLineNumber: 137,
                headLineNumber: 136,
                content:
                  "-\treturn s.syncer.SyncExternalService(ctx, store, sj.ExternalServiceID, s.minSyncInterval)",
              },
            ],
          },
        ],
      },
    ];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parentcommitid {
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140.84%;
  /* identical to box height, or 20px */
  letter-spacing: 0.04em;

  /* web-content$link-color/light */
  color: #1c7cd6;
}
.codelines {
  background: #fbfdff;
}
.redbg {
  background: #ffe4e9;
}
.greenbg {
  background: #d8ffcb;
}
.tdlinenumber {
  font-family: Courier New;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  /* or 167% */

  text-align: right;

  /* $gray-12 */

  color: #6078a9;
}
.tdcontent {
  font-family: Courier New;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  /* or 167% */

  /* $code.punc */

  color: #657b83;
}
.numberrangeinfo {
  position: static;

  left: 8px;
  top: 4px;

  font-family: Courier New;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  /* or 133% */

  /* $gray-11 */
  color: #6d84b0;
}
.groupicon {
  width: 20px;
  height: 20px;
  /* web-content$body-color/light */
}
.filename {
  /* enterprise/internal/first/path/first_file.go */

  width: 266px;
  height: 20px;

  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140.84%;
  /* identical to box height, or 20px */
  letter-spacing: 0.04em;

  /* web-content$link-color/light */
  color: #1c7cd6;
}
.description {
  /* This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ipsum massa egestas id pellentesque volutpat maecenas amet. */

  height: 40px;

  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  letter-spacing: 0.05em;

  /* web-content$body-color/light */
  color: #32405d;
}
.commitedby {
  /* By renovate-bot */
  height: 20px;
  padding-top: 20px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  /* $text-muted / Light */
  color: #6d727c;
}
.author {
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  color: #6d727c;

  letter-spacing: 0.05em;
}
.authorname {
  margin: 0px 4px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: 0.05em;

  /* $body-color/light */

  color: #2b3750;
}
.heading {
  height: 24px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  letter-spacing: 0.05em;

  /* $gray-17 */

  color: #39496a;
}
.avatar {
  padding: 0.5rem;
  width: 49px;
  height: 49px;
}

@media screen and (max-width: 600px) {
  .toppadding {
    padding-top: 100px !important;
  }
}
</style>
